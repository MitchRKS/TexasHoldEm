// Global variables
const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const cards = []
const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']

// Classes

// class Deck {
//     constructor(suit, rank){
//         this.suit = suit;
//         this.rank = rank;
//     }
   
//     shuffle(){
//         // Randomize order of objects in array
//     }
//     dealStart(){
//         //Deal 2 hole cards to each player
//     }
//     dealFlop(){
//         //Deal 3 community cards
//     }
//     dealTurn(){
//         //Deal 1 community card
//     }
//     dealRiver(){
//         //Deal 1 community card
//     }
// }
function buildDeck(){
    for (let i=0; i<suits.length; i++){
        for (let x=0; x<ranks.length; x++){
            let newCard = {Rank: ranks[x], Suit: suits[i]}
            cards.push(newCard);
        }
    }
}
buildDeck();
console.log(cards);