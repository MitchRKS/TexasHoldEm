// Global variables

const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']

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
        //Deal 2 hole cards to each player
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
const deckOne = new Deck;
console.log(deckOne)
deckOne.shuffle();
console.log(deckOne);
// deckOne.shuffle();
// console.log(deckOne);
/**
 * Sticking Points:
 * Had to use for(in) loop instead of a for(of) loop to get the suits to attack to the cards. Reason?
 * Remember to create and push objects not strings
 * Shuffler addes an undefined object to the deck???
 */

//  function shuffle(Deck) {
//     let index = Deck.length, randomIndex;    
//     while (index != 0) {
//       randomIndex = Math.floor(Math.random() * index);
//       index--;
//       [values[index], values[randomIndex]] = [
//         values[randomIndex], values[index]];
//     }
//     return values;
//   }
  
//   // define an array and randomize it
//   var arr = ['a', 'b', 'c', 'd', 'e'];
//   randomize(arr);
//   console.log(arr);