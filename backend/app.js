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


router.get('/send', (req,res) => { 
    io.emit("hello", "lon nhat anh");
});

const GameFactory = require('./factory/GameFactory');
const gameFactory = new GameFactory();

io.on("connection", (socket) => {
    socket.on("requestStartGame", (arg) => {
        const id = arg;
        gameFactory.startGame(id);

        let gameSocket = gameFactory.getGameSocketFactory(id);
        gameSocket.forEach((socket) => {
            socket.emit("responseStartGame", {});
        });
    })
    
    socket.on("requestJoinOwner", (arg) => {
        const owner = arg.owner;
        const roomId = arg.roomId;
        
        let game = gameFactory.getGameFactory(roomId);
        let gameSocket = gameFactory.getGameSocketFactory(roomId);
        game.owner = owner;

        let player = {};
        player.username = owner;
        player.cards = [];

        game.players.push(player);
        gameSocket.push(socket);

        socket.emit("responseJoinOwner", game);
    })

    socket.on("requestJoinPlayer", (arg) => {
        const player = arg.player;
        const roomId = arg.roomId;

        if (gameFactory.hasGameRoomId(roomId)) {
            let game = gameFactory.getGameFactory(roomId);
            let gameSocket = gameFactory.getGameSocketFactory(roomId);
    
            let playerData = {};
            playerData.username = player;
            playerData.cards = [];

            game.players.push(playerData);
            gameSocket.push(socket);

            gameSocket.forEach((socket) => {
                socket.emit("responseJoinPlayerSuccess", game);
            });
        }else {
            socket.emit("responseJoinPlayerFail", {});
        }
    })

    socket.on("join", (arg) => {
        const data = arg;
        let game = gameFactory.getGameFactory(data.id);
        let gameSocket = gameFactory.getGameSocketFactory(data.id);
        gameSocket.forEach((socket) => {
            socket.emit("loadDeskData", game);
        });
    })

    socket.on("requestPlayCard", (arg) => {
        let player = arg.player;
        let roomId = arg.roomId;
        let playerTurn = gameFactory.getPlayerTurn(roomId);

        if (playerTurn.username === player) {
            socket.emit("responsePlayCard", {status: "YOUR_TURN"});
            gameFactory.nextTurn(roomId);
        }else {
            socket.emit("responsePlayCard", {status: "OPPONENT_TURN"});
        }

    })

})



// Initial setup
app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
