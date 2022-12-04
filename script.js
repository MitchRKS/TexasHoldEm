// Global variables
const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']
const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const bodyEl = document.querySelector("body");

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
        this.table.chipCount +=5;
    }
    betLarge(){
        this.chipCount -= 10;
        this.table.chipCount += 10;
    }
    fold(){
        alert('Opponent Folds, You Win!');
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
    awardPot(player) {
        player.chipCount += this.chipCount
        this.chipCount = 0;
        return;
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

//Buttons

const dealBtn = document.createElement("button");
dealBtn.textContent = 'Deal';
dealBtn.classList.add("btn")
bodyEl.appendChild(dealBtn);

const betSmallBtn = document.createElement("button");
betSmallBtn.textContent = 'Bet 5';
betSmallBtn.classList.add("btn");


const betLargeBtn = document.createElement("button");
betLargeBtn.textContent = 'Bet 10';
betLargeBtn.classList.add('btn');


const dealer = new Dealer();
const table = new Table();
const playerOne = new Player(table, 100);
const playerTwo = new Player(table, 100);

console.log(dealer)
console.log(table)
console.log(playerOne)
console.log(playerTwo);

playerOne.betLarge();
console.log(playerOne);
console.log(table);
table.awardPot(playerOne);
console.log(playerOne);
console.log(table);

// Event Listeners
dealBtn.addEventListener("click", () => {
    dealer.dealCards(2, playerOne)
    dealer.dealCards(2, playerTwo)
    console.log(playerOne);
    console.log(playerTwo);
})

betSmallBtn.addEventListener("click", () => {
playerOne.betSmall();
if (Math.random()>.5){
    playerTwo.betSmall()
    dealer.dealCards(3, table);
    determineStake();
} else {
    playerTwo.fold();
    table.awardPot(playerOne);
    playerOne.board = []
    playerTwo.board = []
}
console.log(playerOne)
}); //Want this to be work for any player

betLargeBtn.addEventListener("click", () => {
    playerOne.betLarge();
    if (Math.random()>.25){
        playerTwo.betLarge()
        dealer.dealCards(1, table);
    } else {
        playerTwo.fold();
        table.awardPot(playerOne);
    }
    console.log(playerOne)
    }); 

//Want to replace bet small button w/ bet large button after the flop

function determineStake(){
    if (table.board.length === 0){
        bodyEl.appendChild(betSmallBtn)
        return;
    } else {
        bodyEl.removeChild(betSmallBtn);
        bodyEl.appendChild(betLargeBtn)
        return;
    }
}
determineStake();
/**
 * Remaining items:
 * Instruction modal
 * Bet functionality
 * Win conditions
 * Buttons
 * Display elements
 */