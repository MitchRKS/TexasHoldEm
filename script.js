// Global variables
const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']
const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

// Classes
class Player {
    constructor(table, chipCount){
        this.board = [];
        this.table = table;
        this.name = name; 
        this.chipCount = chipCount;
    }
    get handStrength(){
        let strength = 0;
        for (let card of this.table.board){
            const rankNum = parseInt(card.rank)
            strength += rankNum; 
        }
        for (let card of this.board){
            strength += card.rank;
        }
        return strength;
    }
    get handFull() {
        return this.board.length >= 2;
    }
    betSmall(){
        this.chipCount -= 5;
        this.table.pot +=5;
    }
    betLarge(){
        this.chipCount -= 10;
        this.table.chipCount += 10;
    }
}

class Table extends Player {
    constructor(){
        super();
        this.players = [new Player(this), new Player(this)];
        this.board = [];
        this.chipCount = 0;
    }

    readBoard() {
        let winningHand = 0;
        let winningPlayer = "";
        for (let player of this.players){
            if (player.handStrength >= winningHand){
                winningHand = player.handStrength;
                winningPlayer = player.name;
                //alert('new high hand')
            }
        }
    }
}    

class Dealer extends Table{
    constructor(){
        super();
        this.deck = []
        for (let suit in suits){
            for (let rank in ranks){
                const card = {
                    rank: `${ranks[rank]}`,
                    suit: `${suits[suit]}`
                }
            this.deck.push(card);
            }
        }
        this.shuffle();
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
    dealCards(num, target) {
        const nextCards = this.deck.splice(0,num);
        for (let card of nextCards){
            target.board.push(card); 
        }
    }
}

const dealer = new Dealer();
const table = new Table();
const playerOne = new Player(table, 100);
const playerTwo = new Player(table, 100);

dealer.dealCards(2, playerOne)
dealer.dealCards(2, playerTwo)
dealer.dealCards(3, table)
table.readBoard();

console.log(dealer)
console.log(table)
console.log(playerOne)
console.log(playerTwo);

playerOne.betLarge();
console.log(playerOne);
console.log(table);
/**
 * Remaining items:
 * Instruction modal
 * Bet functionality
 * Win conditions
 * Buttons
 * Display elements
 */