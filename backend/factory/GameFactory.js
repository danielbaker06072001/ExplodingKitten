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


/**
 * Single Card (My turn)
 * - See the future
 * - Favor
 * - Shuffle
 * - Attack
 * - Skip
 * 
 * Single Card (Enemy turn)
 * - Nope
 * 
 * Two of a kind
 * - 2x Special card
 * 
 * Three of a kind
 * - 3x Card
 * 
 * 5 Different Cards
 * - 1x Every Special Card
 */

class GameData {
    constructor(data) {
        this.roomId  = data.roomId;
        this.status  = data.status;
        this.desk  = data.desk;
        this.owner  = data.owner;
        this.players  = data.players;
        this.playerTurn  = data.playerTurn;
        this.turnHistory = data.turnHistory;
    }

    drawCard(username) {
        let cardDraw = this.desk[this.desk.length-1]; 
        let playerTurn = this.getPlayerByUsername(username);
        
        this.desk = this.desk.slice(0, this.desk.length -1); 
        this.playerTurn.cards.push(cardDraw);
    }

    
    startGame() {
        this.status = "STARTING";
        this.generateGameDesk();
    }
    
    generateGameDesk() {
        for(let i = 0; i < this.players.length*4; i++) {
            let playerTurn = this.players[i%this.players.length];

            playerTurn.cards.push(this.desk.pop());
            this.desk = this.desk.slice(0, this.desk.length -1);
        }
    }
    
    getPlayerByUsername(username) {
        return this.players.find(element => element.username === username);
    }

    getPlayerTurn() {
        return this.players[this.playerTurn%this.players.length];
    }

    isPlayerTurn(username) {
        let playerTurn = this.getPlayerTurn();
        return playerTurn.username === username;
    }

    nextTurn() { 
        this.playerTurn++;
    }
    
    drawCard(username) {
        let cardDraw = this.desk[this.desk.length-1]; 
        let playerTurn = this.getPlayerTurn(this.roomId);
        
        this.desk = this.desk.slice(0, this.desk.length -1); 
        playerTurn.cards.push(cardDraw);
    }

    playCard(username, cards, cardIndexes) { 
        let playerTurn = this.getPlayerByUsername(username);
        playerTurn.cards = this.removeItemOnce(playerTurn.cards, cardIndexes);
    }

    getTurnHistory() { 
        return turnHistory;
    }
    
    removeItemOnce(playerCards, cardIndexes) {
        cardIndexes = cardIndexes.slice().sort((a,b)=>a-b).reverse();
        cardIndexes.forEach(element => {
            playerCards.splice(element, 1);
        });
        return playerCards;
    }

    callUpdateGame(gameSocket) {
        gameSocket.forEach((socket) => {
            socket.emit("response", {
                type: 'RESPONSE_UPDATE_GAME',
                data: {
                    game: this
                }
            });
        });
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
                turnHistory: []
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
};

function generateDesk () { 
    let arr = [];
    
    // arr = arr.concat(generateDeckByAmount("SEE_THE_FUTURE", 5));
    // arr = arr.concat(generateDeckByAmount("DEFUSE",6));
    // arr = arr.concat(generateDeckByAmount("NOPE",5));
    // arr = arr.concat(generateDeckByAmount("SKIP",4));
    // arr = arr.concat(generateDeckByAmount("EXPLODING_KITTEN",4));
    // arr = arr.concat(generateDeckByAmount("FAVOR",4));
    // arr = arr.concat(generateDeckByAmount("SHUFFLE",4));
    // arr = arr.concat(generateDeckByAmount("ATTACK",4));
    
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