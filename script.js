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
boardDiv.textContent = 'Community Cards'
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
        const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
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
        playerHoleCards.classList.add("card")
        playerHoleCards.setAttribute("id", "player-hole-cards");
        playerDiv.appendChild(playerHoleCards);
        const compCards = this.deck.splice(0, 2);
        const holeCardThree = compCards[0];
        const holeCardFour = compCards[1];
        compHoleCards.textContent = `${holeCardThree.rank} of ${holeCardThree.suit} | ${holeCardFour.rank} of ${holeCardFour.suit}`
        compHoleCards.classList.add("card")
        compHoleCards.setAttribute("id", "comp-hole-cards");
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
        flop.classList.add("card")
        bodyEl.appendChild(flop);
    }
    dealTurn(){
        const turnCard = this.deck.splice(0, 1)[0];
        turn.textContent = `${turnCard.rank} of ${turnCard.suit}`
        turn.classList.add("card");
        bodyEl.appendChild(turn);
    }
    dealRiver(){
        const riverCard = this.deck.splice(0, 1)[0];
        river.textContent = `${riverCard.rank} of ${riverCard.suit}`
        river.classList.add("card");
        bodyEl.appendChild(river);
    }
    evaluateBoard(){
        
    }
}

class Character {
    constructor(name, chipCount){
        this.pool = []
        this.name = name;
        this.chipCount = chipCount;
        const names = ['wild bill', 'wyatt earp'];
        const chipCounts = [1000, 1000];
        for (let name in names){
            for (let chipCount in chipCounts){
                const character = {
                    name: `${names[name]}`,
                    chipCount: `${chipCounts[chipCount]}`
                }
                this.pool.push(character);
            }
        }
    }
    
}

//class Dealer {}
const deckOne = new Deck();

deckOne.shuffle();
deckOne.dealStart();
deckOne.dealFlop();
deckOne.dealTurn();
deckOne.dealRiver();

// Buttons
const dealButton = document.createElement("button");
dealButton.textContent = 'DEAL';
bodyEl.appendChild(dealButton);

const foldButton = document.createElement("button")
foldButton.textContent = 'FOLD';
bodyEl.appendChild(foldButton);

const callButton = document.createElement("button");
callButton.textContent = 'CALL';
bodyEl.appendChild(callButton);

const raiseButton = document.createElement("button");
raiseButton.textContent = 'RAISE';
bodyEl.appendChild(raiseButton);
// Event Listeners
dealButton.addEventListener("click", ()=> {
    deckOne.shuffle();
    deckOne.dealStart();
})
debugger
deckOne.evaluateBoard();

// dealButton.addEventListener("click", ()=> {
//     console.log('deal btn listener 2 connected')
// })

/**
 * Sticking Points:
 * Had to use for(in) loop instead of a for(of) loop to get the suits to attack to the cards. Reason?
 * Remember to create and push objects not strings
 * Shuffler addes an undefined object to the deck???
 * Why can't I call the dealFlop method from the Deck class while inside of the event listener?
 */
/**
 * AHA moments:
 * can tack on an index selector to the end of the splice method in the methods within the Class constructor (removes a step from the process)
 */

//dealButton.addEventListener("click", deckOne.dealFlop)

/**
 * Link card rank and suit to images
 * Assign them to 
 */

