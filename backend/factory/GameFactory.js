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
 * Exploding card 
 * 
 * Single Card (My turn)
 * - See the future (done)
 * - Favor 
 * - Shuffle (done)
 * - Attack (done)
 * - Skip (done)
 * 
 * Single Card (Enemy turn)
 * - Nope (done)
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
        this.currentTurnDraw = 1;
        this.nextTurnDraw = 1;
        this.currentTurnUsername = null;
        this.seeTheFuture = false;
        this.nopeTurn = 0;
        this.postPlayCard = false;
        this.passNopePlayers = [];
        this.lastCards = []; 
        this.lastCardIndexes = [];
        this.favorTurn = false;
        this.favorTarget = null;
        this.deadPlayers = [];
    }

    checkAllNopePass() { 
        let check = true;
        this.players.forEach(player => {
            if(!this.passNopePlayers.includes(player.username)){
                check = false;
            }
        });
        return check;
    }
    
    startGame() {
        this.status = "STARTING";
        this.currentTurnUsername = this.getPlayerTurn().username;
        this.generateGameDesk();
    }
    
    generateGameDesk() {
        for(let i = 0; i < this.players.length*4; i++) {
            let playerTurn = this.players[i%this.players.length];

            let card = this.desk.pop();
            if (card !== "EXPLODING_KITTEN" ) { 
                playerTurn.cards.push(card);
            }else {
                this.desk.push(card);
                this.desk.sort((a,b) => 0.5 - Math.random());
                i--;
            }
        }
    }
    
    getPlayerByUsername(username) {
        return this.players.find(element => element.username === username);
    }

    getPlayerTurn() {
        let playerTurnData = this.players[this.playerTurn%this.players.length];

        while(playerTurnData.dead) {
            this.playerTurn++;

            playerTurnData = this.players[this.playerTurn%this.players.length];
        }

        return playerTurnData;
    }

    isPlayerTurn(username) {
        let playerTurn = this.getPlayerTurn();
        return playerTurn.username === username;
    }

    nextTurn() { 
        this.currentTurnDraw--;
        
        this.nopeTurn = 0;
        this.favorTurn = false;
        this.favorTarget = null;

        if (this.currentTurnDraw == 0) {
            this.playerTurn++;
            this.currentTurnDraw = this.nextTurnDraw;
        }else {
            this.nextTurnDraw = 1;
        }
    }
    
    drawCard(username) {
        let cardDraw = this.desk[this.desk.length-1]; 
        let playerTurn = this.getPlayerTurn(this.roomId);
        
        this.desk = this.desk.slice(0, this.desk.length -1); 
        playerTurn.cards.push(cardDraw);

        this.seeTheFuture = false;
        this.favorTurn = false;
        this.favorTarget = null;
        this.turnHistory = [];
    }

    playCard(username, cards, cardIndexes) { 
        let playerTurn = this.getPlayerByUsername(username);
        playerTurn.cards = this.removeItemOnce(playerTurn.cards, cardIndexes);

        this.turnHistory.push([...cards]);
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
        this.currentTurnUsername = this.getPlayerTurn().username;

        gameSocket.forEach((socket) => {
            socket.emit("response", {
                type: 'RESPONSE_UPDATE_GAME',
                data: {
                    game: this
                }
            });
        });
    }

    removeNope(username) { 
        let playerTurn = this.getPlayerByUsername(username);
        playerTurn.cards.splice(playerTurn.cards.indexOf("NOPE"), 1);    
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
    
    arr = arr.concat(generateDeckByAmount("SEE_THE_FUTURE", 5));
    arr = arr.concat(generateDeckByAmount("DEFUSE",6));
    arr = arr.concat(generateDeckByAmount("NOPE",5));
    arr = arr.concat(generateDeckByAmount("SKIP",4));
    arr = arr.concat(generateDeckByAmount("EXPLODING_KITTEN",400));
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