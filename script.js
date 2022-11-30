// // Global variables

// const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']

// //Classes

class Deck {
    constructor(){
        this.deck = []
        const suits = ['spades', 'hearts', 'diamonds', 'clubs']
        const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
        for (let suit in suits){
            for (let rank in ranks){
                this.deck.push(`${ranks[rank]} of ${suits[suit]}`);
            }
        }
    }
}
const deckOne = new Deck;
console.log(deckOne.deck);

// class Deck {
//     constructor() {
//       this.deck = [];
//       const suits = ['Hearts', 'Spades', 'Clubs', 'Diamonds'];
//       const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
  
//       for (let suit in suits) {
//         for (let value in values) {
//           this.deck.push(`${values[value]} of ${suits[suit]}`);
//         }
//       }
//     }
//   }
  
//   const deck1 = new Deck();
//   console.log(deck1.deck);