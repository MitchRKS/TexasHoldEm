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

const playerHoleCards = document.createElement("div")

const compHoleCards = document.createElement("div");

const flop = document.createElement("div");

const turn = document.createElement("div");

const river = document.createElement("div");
// Classes
class Deck {
    constructor(){
        this.deck = []
        const suits = ['spades', 'hearts', 'diamonds', 'clubs']
        const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        for (let suit in suits){
            for (let rank in ranks){
                const card = {
                    rank: `${ranks[rank]}`,
                    suit: `${suits[suit]}`
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
        const holeCardOne = playerCards[0];
        const holeCardTwo = playerCards[1];
        playerHoleCards.textContent = `${holeCardOne.rank} of ${holeCardOne.suit} | ${holeCardTwo.rank} of ${holeCardTwo.suit}`
        playerDiv.appendChild(playerHoleCards);
        const compCards = this.deck.splice(0, 2);
        const holeCardThree = compCards[0];
        const holeCardFour = compCards[1];
        compHoleCards.textContent = `${holeCardThree.rank} of ${holeCardThree.suit} | ${holeCardFour.rank} of ${holeCardFour.suit}`
        computerDiv.appendChild(compHoleCards);
    }
    dealFlop(){
        const flopCards = this.deck.splice(0, 3);
        const flopCardOne = flopCards[0];
        console.log(flopCardOne)
        const flopCardTwo = flopCards[1];
        console.log(flopCardTwo);
        const flopCardThree = flopCards[2];
        console.log(flopCardThree);
        flop.textContent = `${flopCardOne.rank} of ${flopCardOne.suit} | ${flopCardTwo.rank} of ${flopCardTwo.suit} | ${flopCardThree.rank} of ${flopCardThree.suit}`
        bodyEl.appendChild(flop);
    }
    dealTurn(){
        const turnCard = this.deck.splice(0, 1)[0];
        turn.textContent = `${turnCard.rank} of ${turnCard.suit}`
        bodyEl.appendChild(turn);
    }
    dealRiver(){
        const riverCard = this.deck.splice(0, 1)[0];
        river.textContent = `${riverCard.rank} of ${riverCard.suit}`
        bodyEl.appendChild(river);
    }
}
const deckOne = new Deck
deckOne.shuffle();
deckOne.dealStart();
deckOne.dealFlop();
deckOne.dealTurn();
deckOne.dealRiver();

/**
 * Sticking Points:
 * Had to use for(in) loop instead of a for(of) loop to get the suits to attack to the cards. Reason?
 * Remember to create and push objects not strings
 * Shuffler addes an undefined object to the deck???
 */
/**
 * AHA moments:
 * can tack on an index selector to the end of the splice method in the methods within the Class constructor (removes a step from the process)
 */
function renderBoard(){
    
    
}
renderBoard();