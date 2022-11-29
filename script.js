// Global variables
const suit = ['spades', 'hearts', 'diamonds', 'clubs']
const rank = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const hand = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']

// Classes
class Card {
    constructor(suit, rank){
        this.suit = suit;
        this.rank = rank;
    }
}

class Deck {
    constructor(suit, rank){
        this.suit = suit;
        this.rank = rank;
    }
    shuffle(){
        //USE GOOGLE
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