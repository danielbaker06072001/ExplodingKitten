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
        this.map = {};
        let playerListExample = [
    {
      username: "duc",
      cards: []
    },
    {
      username: "nhatanh",
      cards: []
    },
    {
      username: "quangloz",
      cards: []
    },
    {
      username: "duongtruc",
      cards: []
    },
  ];
    }

    getGameFactory(gameId) {
        if (this.map[gameId]) {
            const game = this.map[gameId];
            return game;
        }else {
            const game = {
                id: gameId,
                desk: generateDesk(),
                players: [
                    {
                      username: "duc",
                      cards: []
                    },
                    {
                      username: "nhatanh",
                      cards: []
                    },
                    {
                      username: "quangloz",
                      cards: []
                    },
                    {
                      username: "duongtruc",
                      cards: []
                    },
                ]
            };

            let desk = game.desk;
            let players = game.players;
            for(let i = 0 ; i < 16; i++) { 
                let player = players[i % 4];
                let lastCardInDesk = desk.slice(desk.length - 1);
                desk = desk.slice(0, desk.length - 1);
                
                player.cards.push(lastCardInDesk);
            }

            game.desk = desk;

            this.map[gameId] = game;
            return game;
        }
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