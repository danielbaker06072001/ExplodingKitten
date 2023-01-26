// app.js
const express = require('express');
const connectDB = require("./config/db");
const router = express.Router();

const Players = require('./models/player');

const app = express();
app.use('/', router);

connectDB();


router.get('/player', (req, res) => res.send("cac"));

router.get('/get_player', (req,res) => { 
    Players.find()
        .then(username => res.json(username))
        .catch(err => res.status(400).json({noPlayersfound:"NO players founds"}));
})


//
// Set up example socket
//
const { Server } = require('socket.io');
const cors = require("cors");

app.use(cors());
const io = new Server(8080, 
    {
        cors:{
            origin: "http://localhost:8080", 
            method: ["GET", "POST"],
        },
    }
);

const GameFactory = require('./factory/GameFactory');
const gameFactory = new GameFactory();

io.on("connection", (socket) => {
    socket.on("request", (arg) => {
        const type = arg.type;
        const data = arg.data;

        console.log(type, data)

        switch(type) {
            case "REQUEST_START_GAME":
                requestStartGame(data);
                break;
            case "REQUEST_JOIN_OWNER":
                requestJoinOwner(data);
                break;
            case "REQUEST_JOIN_PLAYER":
                requestJoinPlayer(data);
                break;  
            case "REQUEST_PLAY_CARD":
                requestPlayCard(data);
                break;
            case "REQUEST_DRAW_CARD":
                requestDrawCard(data);
                break;
            default:
                break;
        }
    })

    function requestStartGame(data) {
        const id = data.roomId;
        
        let game = gameFactory.getGameFactory(id);
        let gameSocket = gameFactory.getGameSocketFactory(id);
        
        if (game.status === "STARTING"){ 
            gameSocket.forEach((socket) => {
                socket.emit("response", {
                    type: 'RESPONSE_START_GAME',
                    data: {
                        status: "ALREADY_START_GAME",
                        game: game
                    }
                });
            });
            return;
        }

        game.startGame();

        gameSocket.forEach((socket) => {
            socket.emit("response", {
                type: 'RESPONSE_START_GAME',
                data: {
                    status: "SUCCESS",
                    game: game
                }
            });
        });
    }
    
    function requestJoinOwner(data) {
        const owner = data.owner;
        const roomId = data.roomId;
        
        let game = gameFactory.getGameFactory(roomId);
        let gameSocket = gameFactory.getGameSocketFactory(roomId);
        game.owner = owner;

        let player = {};
        player.username = owner;
        player.cards = [];

        game.players.push(player);
        gameSocket.push(socket);

        socket.emit("response", {
            type: "RESPONSE_JOIN_OWNER",
            data: {
                game: game
            }
        });
    }

    function requestJoinPlayer(data) {
        const player = data.player;
        const roomId = data.roomId;

        if (gameFactory.hasGameRoomId(roomId)) {
            let game = gameFactory.getGameFactory(roomId);
            let gameSocket = gameFactory.getGameSocketFactory(roomId);
    
            let playerData = {};
            playerData.username = player;
            playerData.cards = [];
            game.players.push(playerData);
            gameSocket.push(socket);

            gameSocket.forEach((socket) => {
                socket.emit("response", {
                    type: "RESPONSE_JOIN_PLAYER_SUCCESS",
                    data: {
                        game: game
                    }
                });
            });
        }else {
            socket.emit("response", {
                type: "RESPONSE_JOIN_PLAYER_FAIL",
                data: {
                    game: game
                }
            });
        }
    }

    // socket.on("join", (arg) => {
    //     const data = arg;
    //     let game = gameFactory.getGameFactory(data.id);
    //     let gameSocket = gameFactory.getGameSocketFactory(data.id);
    //     gameSocket.forEach((socket) => {
    //         socket.emit("loadDeskData", game);
    //     });
    // })

    function requestPlayCard(data) {
        let username = data.username;
        let roomId = data.roomId;
        let cards = data.cards;

        let game = gameFactory.getGameFactory(roomId);
        let gameSocket = gameFactory.getGameSocketFactory(roomId);
        if (game.isPlayerTurn(username)) {
            socket.emit("response", {
                type: "RESPONSE_PLAY_CARD",
                data: {
                    status: "YOUR_TURN"
                }
            });
            
            game.playCard(username, cards);
            game.callUpdateGame(gameSocket);
        }else {
            socket.emit("response", {
                type: "RESPONSE_PLAY_CARD",
                data: {
                    status: "OPPONENT_TURN"
                }
            });
        }
    }
    
    function requestDrawCard(data) {
        let username = data.username;
        let roomId = data.roomId;

        let game = gameFactory.getGameFactory(roomId);
        let gameSocket = gameFactory.getGameSocketFactory(roomId);
        if (game.isPlayerTurn(username)) {
            game.drawCard();
            socket.emit("response", {
                type: "RESPONSE_DRAW_CARD",
                data: {
                    status: "YOUR_TURN",
                    game: game
                }
            });

            game.callUpdateGame(gameSocket);
            
            game.nextTurn();
        }else {
            socket.emit("response", {
                type: "RESPONSE_DRAW_CARD",
                data: {
                    status: "OPPONENT_TURN"
                }
            });
        }
    }
})

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
