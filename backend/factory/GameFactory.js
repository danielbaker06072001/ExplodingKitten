/*
Number of cards in game
Total cards: 56
-----------------------------
- See the future: 5 
- Defuse: 6
- Nope: 5
- Skip: 4
- Exploding kitten: 4
- Favor : 4
- Shuffle: 4
- Attack: 4
- Special card: 20 (5 types - 4 each)
*/

class GameData {
    constructor(data) {
        this.roomId  = data.roomId;
        this.status  = data.status;
        this.desk  = data.desk;
        this.owner  = data.owner;
        this.players  = data.players;
        this.playerTurn  = data.playerTurn;
        this.historyTurn = data.historyTurn;
    }
}
class GameFactory {
    constructor() {
        this.gameData = {};
        this.gameSocket = {};
    }

    hasGameRoomId(roomId) {
        return this.gameData[roomId] ? true : false;
    }

    getGameFactory(roomId) {
        if (this.gameData[roomId]) {
            const game = this.gameData[roomId];
            return game;
        }else {
            const game = new GameData({
                roomId: roomId,
                status: 'WAITING',
                desk: generateDesk(),
                owner: {},
                players: [],
                playerTurn: 0,
                historyTurn: []
            });
            const gameSocket = [];

            this.gameData[roomId] = game;
            this.gameSocket[roomId] = gameSocket;
            return game;
        }
    }

    getGameSocketFactory(roomId) {
        if (this.gameSocket[roomId]) {
            const gameSocket = this.gameSocket[roomId];
            return gameSocket;
        }
        return null;
    }

    startGame(roomId) {
        let game = this.getGameFactory(roomId);
        game.status = "STARTING";
        
        this.generateGameDesk(roomId);
    }
    
    generateGameDesk(roomId) {
        let game = this.getGameFactory(roomId);
        for(let i = 0; i < game.players.length*4; i++) {
            let playerTurn = game.players[i%game.players.length];

            playerTurn.cards.push(game.desk.pop());
            game.desk = game.desk.slice(0, game.desk.length -1);
        }
    }

    getPlayerTurn(roomId) { 
        let game = this.getGameFactory(roomId);
        return game.players[game.playerTurn%game.players.length];
    }

    isPlayerTurn(playerName, roomId) {
        let playerTurn = this.getPlayerTurn(roomId);
        return playerTurn.username === playerName;
    }

    nextTurn(roomId) { 
        let game = this.getGameFactory(roomId);
        game.playerTurn++;
    }

    getPlayCard() { 

    }

    drawCard(playerName, roomId) {
        let game = this.getGameFactory(roomId);
        let cardDraw = game.desk[game.desk.length-1]; 
        let playerTurn = this.getPlayerTurn(roomId);
        
        game.desk = game.desk.slice(0, game.desk.length -1); 
        playerTurn.cards.push(cardDraw);

        console.log("DRAW ", playerName, cardDraw);
    }
};

function generateDesk () { 
    let arr = [];
    
    arr = arr.concat(generateDeckByAmount("SEE_THE_FUTURE", 5));
    arr = arr.concat(generateDeckByAmount("DEFUSE",6));
    arr = arr.concat(generateDeckByAmount("NOPE",5));
    arr = arr.concat(generateDeckByAmount("SKIP",4));
    arr = arr.concat(generateDeckByAmount("EXPLODING_KITTEN",4));
    arr = arr.concat(generateDeckByAmount("FAVOR",4));
    arr = arr.concat(generateDeckByAmount("SHUFFLE",4));
    arr = arr.concat(generateDeckByAmount("ATTACK",4));
    
    arr = arr.concat(generateDeckByAmount("SPECIAL_ONE",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_TWO",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_THREE",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_FOUR",4));
    arr = arr.concat(generateDeckByAmount("SPECIAL_FIVE",4));
    
    arr.sort((a,b) => 0.5 - Math.random());
    return arr;
}

function generateDeckByAmount(type, amount) {
    let arr = [];
    for (let i = 0; i < amount; i++) {
        arr.push((type));
    }
    return arr;
}

module.exports = GameFactory;