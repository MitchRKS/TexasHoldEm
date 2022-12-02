// Global variables
const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']
const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']

// Classes
class Player {
    constructor(table){
        this.hand = [];
        this.table = table;
        this.name = name; 
    }
    get handStrength(){
        let strength = 0;
        for (let card of this.table.board){
            console.log(card)
        }
        for (let card of this.hand){
            strength += card.rank;
        }
        console.log(strength);
        return strength;
    }
    get handFull() {
        return this.hand.length >= 2;
    }
}

class Table {
    constructor(){
        this.players = [new Player(this), new Player(this)];
        this.board = ['push community cards to this array'];
    }

    readBoard() {
        let winningHand = 0;
        let winningPlayer = "";
        for (let player of this.players){
            if (player.handStrength >= winningHand){
                winningHand = player.handStrength;
                winningPlayer = player.name;
                alert('new high hand')
            }
        }
    }
}    

class Dealer extends Table{
    constructor(){
        super();
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
    shuffle() {
        let count = this.deck.length;
        while(count != 0){
            let randomIndex = Math.floor(Math.random() * count);
            count--;
            [this.deck[count], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[count]];
            count--;
        };
    }
    dealCard() {
        let nextCard = this.deck.splice(0, 1);
        
    }
}

let dealer = new Dealer();
dealer.shuffle();
console.log(dealer.deck)
const table = new Table();
//     dealStart(){
//         const playerCards = this.deck.splice(0, 2);
//         const holeCardOne = playerCards[0];
//         const holeCardTwo = playerCards[1];
//         playerHoleCards.textContent = `${holeCardOne.rank} of ${holeCardOne.suit} | ${holeCardTwo.rank} of ${holeCardTwo.suit}`
//         playerHoleCards.classList.add("card")
//         playerHoleCards.setAttribute("id", "player-hole-cards");
//         playerDiv.appendChild(playerHoleCards);
//         const compCards = this.deck.splice(0, 2);
//         const holeCardThree = compCards[0];
//         const holeCardFour = compCards[1];
//         compHoleCards.textContent = `${holeCardThree.rank} of ${holeCardThree.suit} | ${holeCardFour.rank} of ${holeCardFour.suit}`
//         compHoleCards.classList.add("card")
//         compHoleCards.setAttribute("id", "comp-hole-cards");
//         computerDiv.appendChild(compHoleCards);
//     }
//     dealFlop(){
//         const flopCards = this.deck.splice(0, 3);
//         const flopCardOne = flopCards[0];
//         console.log(flopCardOne)
//         const flopCardTwo = flopCards[1];
//         console.log(flopCardTwo);
//         const flopCardThree = flopCards[2];
//         console.log(flopCardThree);
//         flop.textContent = `${flopCardOne.rank} of ${flopCardOne.suit} | ${flopCardTwo.rank} of ${flopCardTwo.suit} | ${flopCardThree.rank} of ${flopCardThree.suit}`
//         flop.classList.add("card")
//         bodyEl.appendChild(flop);
//     }
//     dealTurn(){
//         const turnCard = this.deck.splice(0, 1)[0];
//         turn.textContent = `${turnCard.rank} of ${turnCard.suit}`
//         turn.classList.add("card");
//         bodyEl.appendChild(turn);
//     }
//     dealRiver(){
//         const riverCard = this.deck.splice(0, 1)[0];
//         river.textContent = `${riverCard.rank} of ${riverCard.suit}`
//         river.classList.add("card");
//         bodyEl.appendChild(river);
//     }
// }

// class Deck {
//     constructor(){
//         this.deck = []
//         const suits = ['spades', 'hearts', 'diamonds', 'clubs']
//         const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
//         for (let suit in suits){
//             for (let rank in ranks){
//                 const card = {
//                     rank: `${ranks[rank]}`,
//                     suit: `${suits[suit]}`
//                 }
//                 this.deck.push(card);
//             }
//         }
//     }
    
//     dealStart(){
//         const playerCards = this.deck.splice(0, 2);
//         const holeCardOne = playerCards[0];
//         const holeCardTwo = playerCards[1];
//         playerHoleCards.textContent = `${holeCardOne.rank} of ${holeCardOne.suit} | ${holeCardTwo.rank} of ${holeCardTwo.suit}`
//         playerHoleCards.classList.add("card")
//         playerHoleCards.setAttribute("id", "player-hole-cards");
//         playerDiv.appendChild(playerHoleCards);
//         const compCards = this.deck.splice(0, 2);
//         const holeCardThree = compCards[0];
//         const holeCardFour = compCards[1];
//         compHoleCards.textContent = `${holeCardThree.rank} of ${holeCardThree.suit} | ${holeCardFour.rank} of ${holeCardFour.suit}`
//         compHoleCards.classList.add("card")
//         compHoleCards.setAttribute("id", "comp-hole-cards");
//         computerDiv.appendChild(compHoleCards);
//     }
//     dealFlop(){
//         const flopCards = this.deck.splice(0, 3);
//         const flopCardOne = flopCards[0];
//         console.log(flopCardOne)
//         const flopCardTwo = flopCards[1];
//         console.log(flopCardTwo);
//         const flopCardThree = flopCards[2];
//         console.log(flopCardThree);
//         flop.textContent = `${flopCardOne.rank} of ${flopCardOne.suit} | ${flopCardTwo.rank} of ${flopCardTwo.suit} | ${flopCardThree.rank} of ${flopCardThree.suit}`
//         flop.classList.add("card")
//         bodyEl.appendChild(flop);
//     }
//     dealTurn(){
//         const turnCard = this.deck.splice(0, 1)[0];
//         turn.textContent = `${turnCard.rank} of ${turnCard.suit}`
//         turn.classList.add("card");
//         bodyEl.appendChild(turn);
//     }
//     dealRiver(){
//         const riverCard = this.deck.splice(0, 1)[0];
//         river.textContent = `${riverCard.rank} of ${riverCard.suit}`
//         river.classList.add("card");
//         bodyEl.appendChild(river);
//     }
// }

// class Character {
//     constructor(name, chipCount){
//         this.pool = []
//         this.name = name;
//         this.chipCount = chipCount;
//         const names = ['wild bill', 'wyatt earp'];
//         const chipCounts = [1000, 1000];
//         for (let name in names){
//             for (let chipCount in chipCounts){
//                 const character = {
//                     name: `${names[name]}`,
//                     chipCount: `${chipCounts[chipCount]}`
//                 }
//                 this.pool.push(character);
//             }
//         }
//     }
    
// }

/* Doms Code */
// class Player {
//     constructor(board) {
//       this.hand = [1, 5];
//       this.board = board;
//       this.name = "Whatever";
//     }
  
//     get handStrength() {
//       let strength = 0;
  
//       // Add the river
//       for (let card of this.board.river) {
//         strength += card;
//       }
  
//       // Add our hand
//       for (let card of this.hand) {
//         strength += card;
//       }
  
//       return strength;
//     }
  
//     get handFull() {
//       return this.hand.length >= 2;
//     }
//   }
  
//   class Board {
//     constructor() {
//       this.players = [new Player(this), new Player(this)];
//       this.river = [1, 6, 4, 7];
//     }
  
//     whoWinsThisGame() {
//       let topHand = 0;
//       let winningPlayer = "";
//       for (let player of this.players) {
//         if (player.handStrength >= topHand) {
//           topHand = player.handStrength;
//           winningPlayer = player.name;
//         }
//       }
  
//       // Alert winningPlayer
//       // Run all the logic to end or reset the game
//     }
//   }
  
//   const board = new Board();