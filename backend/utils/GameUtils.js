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

class GameUtils {
    constructor() {
        this.singleCardType = ["SEE_THE_FUTURE", "FAVOR", "SHUFFLE", "ATTACK", "SKIP", "NOPE"];
        this.specialCardType = ["SPECIAL_ONE", "SPECIAL_TWO", "SPECIAL_THREE", "SPECIAL_FOUR", "SPECIAL_FIVE"];
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
        }else if (cards.length == 5) {
            return this.isFiveDifferentCards(cards) ? "FIVE_DIFFERENT_COMBO" : "INVALID"
        }
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
            return cards[0] === cards[1] || cards[1] === cards[2];
        }else {
            return false;
        }
    }

    isFiveDifferentCards(cards) { 
        for (let specialCard in this.specialCardType) {
            if (!cards.includes(specialCard)) {
                return false;
            }
        }

        return true;
    }

}

module.exports = GameUtils;