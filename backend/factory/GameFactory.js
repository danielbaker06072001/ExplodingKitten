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

class GameFactory {
    constructor() {
        this.gameData = {};
        this.gameSocket = {};
    }

    hasGameRoomId(gameId) {
        return this.gameData[gameId] ? true : false;
    }

    getGameFactory(gameId) {
        if (this.gameData[gameId]) {
            const game = this.gameData[gameId];
            return game;
        }else {
            const game = {
                id: gameId,
                status: 'WAITING',
                desk: generateDesk(),
                owner: {},
                players: [], 
                playerTurn: 0
            };

            const gameSocket = [];

            this.gameData[gameId] = game;
            this.gameSocket[gameId] = gameSocket;
            return game;
        }
    }

    getGameSocketFactory(gameId) {
        if (this.gameSocket[gameId]) {
            const gameSocket = this.gameSocket[gameId];
            return gameSocket;
        }
        return null;
    }

    startGame(gameId) {
        let game = this.getGameFactory(gameId);
        game.status = "STARTING";
        
        this.generateGameDesk(gameId);
    }
    
    generateGameDesk(gameId) {
        let game = this.getGameFactory(gameId);
        for(let i = 0; i < game.players.length*4; i++) {
            let playerTurn = game.players[i%game.players.length];

            playerTurn.cards.push(game.desk.pop());
            game.desk = game.desk.slice(0, game.desk.length -1);
        }
    }

    getPlayerTurn(gameId) { 
        let game = this.getGameFactory(gameId);
        return game.players[game.playerTurn%game.players.length];
    }

    isPlayerTurn(playerName, gameId) {
        let playerTurn = this.getPlayerTurn(gameId);
        return playerTurn.username === playerName;
    }

    nextTurn(gameId) { 
        let game = this.getGameFactory(gameId);
        game.playerTurn++;
    }

    getPlayCard() { 

    }

    drawCard(playerName, gameId) {
        let game = this.getGameFactory(gameId);
        let cardDraw = game.desk[game.desk.length-1]; 
        let playerTurn = this.getPlayerTurn(gameId);
        
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