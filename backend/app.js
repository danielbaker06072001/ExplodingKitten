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
    socket.on("join", (arg) => {
        const id = arg;
        console.log(JSON.stringify(gameFactory.getGameFactory(id)));
        socket.emit("loadDeskData",JSON.stringify(gameFactory.getGameFactory(id)));
    })
})


// Initial setup
app.get('/', (req, res) => res.send('Hello world!'));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
