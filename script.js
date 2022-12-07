// Global variables
const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']
const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const bodyEl = document.querySelector("body");

// Classes
class Player {
    constructor(name, table, chipCount){
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
        clearBoards();
        dealer.shuffle();
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
        //let winningPlayer = "";
        for (let player of this.players){
            if (player.handStrength >= winningHand){
                winningHand = player.handStrength;
                //winningPlayer = player.name;
                //alert('new high hand')
            }
        }
    }
    awardPot(player) {
        player.chipCount += this.chipCount
        this.chipCount = 0;
        clearBoards();
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
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card")
            cardDiv.textContent = `${card.rank} of ${card.suit}`;
            bodyEl.appendChild(cardDiv);
        }
    }
}

//Buttons

const dealBtn = document.createElement("button");
dealBtn.textContent = 'Deal';
dealBtn.classList.add("btn")

const betSmallBtn = document.createElement("button");
betSmallBtn.textContent = 'Bet 5';
betSmallBtn.classList.add("btn");


const betLargeBtn = document.createElement("button");
betLargeBtn.textContent = 'Bet 10';
betLargeBtn.classList.add('btn');


const dealer = new Dealer();
const table = new Table();
const playerOne = new Player('playerOne', table, 1000);
const playerTwo = new Player('playerTwo', table, 1000);

// Event Listeners
dealBtn.addEventListener("click", () => {
    if (playerOne.board.length === 2){
        console.log('player hands full');
    } else {
        dealer.dealCards(2, playerOne)
        dealer.dealCards(2, playerTwo)
    }
})

betSmallBtn.addEventListener("click", () => {
playerOne.betSmall();
if (Math.random()>.01){
    playerTwo.betSmall()
    dealer.dealCards(3, table);
    renderTable();
} else {
    playerTwo.fold();
    renderTable();
}
});

betLargeBtn.addEventListener("click", () => {
    playerOne.betLarge();
    if (Math.random()>.25){
        playerTwo.betLarge()
        dealer.dealCards(1, table);
        renderTable();
    } else {
        playerTwo.fold();
        renderTable();
    }
    }); 

// Want to replace bet small button w/ bet large button after the flop

function clearBoards(){
    playerOne.board = []
    playerTwo.board = []
    table.board = []
}

function renderTable(){
    bodyEl.appendChild(dealBtn)
    if (table.board.length === 0){
        bodyEl.appendChild(betSmallBtn);
    } else if (table.board.length === 3){
        bodyEl.removeChild(betSmallBtn);
        bodyEl.appendChild(betLargeBtn);
    } else if (table.board.length > 3 && table.board.length <= 5){
        console.log('turn & river')
    } else {
        console.log('table has an improper number of cards');
    }
}
renderTable();
/**
 * Remaining items:
 * Instruction modal
 * Bet functionality
 * Win conditions
 * Buttons
 * Display elements
 */
