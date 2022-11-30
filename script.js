// Global variables
const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']
const bodyEl = document.querySelector('body');
/* DOM Elements */
const playerDiv = document.createElement("div")
playerDiv.classList.add('character-div')
bodyEl.appendChild(playerDiv);
const computerDiv = document.createElement("div")
computerDiv.classList.add('character-div')
bodyEl.appendChild(computerDiv);
const boardDiv = document.createElement("div")
bodyEl.appendChild(boardDiv);

// Classes
class Deck {
    constructor(){
        this.deck = []
        const suits = ['spades', 'hearts', 'diamonds', 'clubs']
        const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        for (let suit in suits){
            for (let rank in ranks){
                const card = {
                    Rank: `${ranks[rank]}`,
                    Suit: `${suits[suit]}`
                }
                this.deck.push(card);
            }
        }
    }
     shuffle(){
        let count = this.deck.length;
         while(count != 0){
            let randomIndex = Math.floor(Math.random() * count);
            count--;
            [this.deck[count], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[count]];
            count--;
        };
    }
    dealStart(){
        const playerCards = this.deck.splice(0, 2);
        console.log(playerCards);
        const compCards = this.deck.splice(0, 2);
        console.log(compCards);
    }
    dealFlop(){
        //Deal 3 community cards
    }
    dealTurn(){
        //Deal 1 community card
    }
    dealRiver(){
        //Deal 1 community card
    }
}
const deckOne = new Deck
deckOne.shuffle();
deckOne.dealStart();

/**
 * Sticking Points:
 * Had to use for(in) loop instead of a for(of) loop to get the suits to attack to the cards. Reason?
 * Remember to create and push objects not strings
 * Shuffler addes an undefined object to the deck???
 */

