/**
 * Single Card (My turn)
 * - See the future (done - some time got error)
 * - Favor
 * - Shuffle (done)
 * - Attack (done)
 * - Skip (done)
 * 
 * Single Card (Enemy turn)
 * - Nope
 * 
 * Two of a kind
 * - 2x Special card
 * 
 * Three of a kind
 * - 3x Card
 */

class GameUtils {
    constructor() {
        this.singleCardType = ["SEE_THE_FUTURE", "FAVOR", "SHUFFLE", "ATTACK", "SKIP", "NOPE"];
        this.specialCardType = ["SPECIAL_ONE", "SPECIAL_TWO", "SPECIAL_THREE", "SPECIAL_FOUR", "SPECIAL_FIVE"];
    }

    checkExplode(username, game, gameSocket) {
        let playerTurn = game.getPlayerByUsername(username);

        if (!playerTurn.cards.includes("EXPLODING_KITTEN")) {
            game.nextTurn();
            return;
        }

        if(!playerTurn.cards.includes("DEFUSE")) {
            game.deadPlayers.push(username);
            game.forceNextTurn();
            return;
        }
             
        playerTurn.cards.splice(playerTurn.cards.indexOf("DEFUSE"), 1);
        playerTurn.cards.splice(playerTurn.cards.indexOf("EXPLODING_KITTEN"),1 );
        game.desk = this.insertIntoArray(game.desk, "EXPLODING_KITTEN");
        game.nextTurn();
    }

    checkEndgame(game, gameFactory, gameSocket) {
        let lastPlayer = null;

        const count = game.players.filter(element => {
            return !game.deadPlayers.includes(element.username);
        }).length;

        if (count > 1) { 
            return false;
        }

        game.callEndGame(gameSocket);
        gameFactory.endGame(game, gameSocket);
        return true;
    }
    
    insertIntoArray(array, value) {
        const randomIndex = Math.floor(Math.random() * (array.length));
        array.splice(randomIndex, 0, value);
        return array;
    }
    
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    handlePostPlayCard(username, cards, cardIndexes, socket, game, gameSocket) {
        let cardTurnType = this.getCardTurnType(cards);
        if (cardTurnType === "INVALID") {
            this.handleInvalidCard(socket);
            return;
        }
        
        // Stage playing nope
        game.postPlayCard = true;
        game.lastCards = cards; 
        game.lastCardIndexes = cardIndexes;

        // See playing card
        socket.emit("response", {
            type: "RESPONSE_PLAY_CARD",
            data: {
                status: "YOUR_TURN",
                cardTurnType: cardTurnType
            }
        });

        game.playCard(username, cards, cardIndexes);
        game.callUpdateGame(gameSocket);
    }

    handlePrePlayCard(username, cards, cardIndexes, socket, game, gameSocket) {
        let cardTurnType = this.getCardTurnType(cards);

        if (cardTurnType === "SINGLE") {
            if (cards[0] === "SKIP") {
                this.handleSkipCard(game, socket);
            }

            if (cards[0] === "ATTACK") { 
                this.handleAttackCard(game, socket);
            }

            if (cards[0] === "SHUFFLE") { 
                this.handleShuffleCard(game, socket);
            }

            if (cards[0] === "SEE_THE_FUTURE") { 
                this.handleSeeTheFuture(game, socket);
            }

            if (cards[0] === "FAVOR") { 
                this.handleFavor(game, socket);
            }
        }

        if (cardTurnType === "TWO_KIND_COMBO") {
            this.handleTwoKindCombo(game, socket);
        }

        if (cardTurnType === "THREE_KIND_COMBO") {
            this.handleThreeKindCombo(game, socket);
        }
        
        game.callUpdateGame(gameSocket);
    }

    handleInvalidCard(socket) {
        socket.emit("response", {
            type: "RESPONSE_PLAY_CARD",
            data: {
                status: "INVALID",
            }
        });
    }
  
    getCardTurnType(cards) {
        if (cards.length == 1) {
            let singleCard = cards[0];
            if (this.isFunctionCard(singleCard)) {
                return "SINGLE";
            }
        }else if (cards.length == 2) {
            return this.isTwoOfAKindCard(cards) ? "TWO_KIND_COMBO" : "INVALID"
        }else if (cards.length == 3) {
            return this.isThreeOfAKindCard(cards) ? "THREE_KIND_COMBO" : "INVALID"
        }
        // else if (cards.length == 5) {
        //     return this.isFiveDifferentCards(cards) ? "FIVE_DIFFERENT_COMBO" : "INVALID"
        // }
        return "INVALID";
    }
    
    isFunctionCard(card) {
        return this.singleCardType.includes(card);
    }  

    isSpecialCard(card) {
        return this.specialCardType.includes(card);
    }
    
    isTwoOfAKindCard(cards) {
        if (this.isSpecialCard(cards[0]) && this.isSpecialCard(cards[1])) { 
            return cards[0] === cards[1];
        }else {
            return false;
        }
    }  

    isThreeOfAKindCard(cards) { 
        if (this.isSpecialCard(cards[0]) && this.isSpecialCard(cards[1]) && this.isSpecialCard(cards[2])) { 
            return cards[0] === cards[1] && cards[1] === cards[2];
        }else {
            return false;
        }
    }

    // isFiveDifferentCards(cards) { 
    //     for (let specialCard of this.specialCardType) {
    //         if (!cards.includes(specialCard)) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    handleSkipCard(game, socket) { 
        game.nextTurn();
    }

    handleAttackCard(game, socket) { 
        game.nextTurnDraw++;
    }

    handleShuffleCard(game, socket) { 
        game.desk.sort((a,b) => 0.5 - Math.random());
    }

    handleSeeTheFuture(game, socket) { 
        game.seeTheFuture = true;
    }

    handleFavor(game, socket) { 
        game.favorTurn = true;
    }

    handleTwoKindCombo(game, socket) { 
        game.twoComboTurn = true;
    }

    handleThreeKindCombo(game, socket) { 
        game.threeComboTurn = true;
    }
}

module.exports = GameUtils;