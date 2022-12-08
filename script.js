// Global variables
const hands = ['High Card', 'Pair', 'Two Pair', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush']
const suits = ['spades', 'hearts', 'diamonds', 'clubs']
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
const bodyEl = document.querySelector("body");
const playerDiv = document.createElement("div")
playerDiv.classList.add("character")
bodyEl.appendChild(playerDiv);

// Classes
class Table {
    constructor(players){
        this.players = players;
        this.board = [];
        this.pot = 0;
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
        table.pot = playerOne.pot + playerTwo.pot
        player.chipCount += this.pot
        this.pot = 0;
        this.clearBoards();
    }
   
    clearBoards() {
        this.board = [];
        this.pot = 0;
        for (let player of this.players){
            player.board = [];
        }
        let allCards = document.querySelectorAll('.card')
        for (let card of allCards){
            bodyEl.removeChild(card)
        }
    }
}   

class Player extends Table{
    constructor(name, chipCount, players, pot){
        super(players, pot);
        this.name = name; 
        this.board = [];
        this.chipCount = chipCount;
    }
   
    betSmall(){
        this.chipCount -= 5;
        this.pot +=5;
    }

    betLarge(){
        this.chipCount -= 10;
        this.pot += 10;
    }

    fold(){
        console.log('Opponent Folds, You Win!');
    }
}

class Dealer extends Table{
    constructor(players){
        super(players);
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
     // get handStrength(){
    //     let strength = 0;
    //     for (let card of this.table.board){
    //         const rankNum = parseInt(card.rank)
    //         strength += rankNum; 
    //     }
    //     for (let card of this.board){
    //         strength += card.rank;
    //     }
    //     return strength;}

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
const playerOne = new Player('playerOne', 1000);
const playerTwo = new Player('playerTwo', 1000);
const table = new Table([playerOne, playerTwo]);

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
    if (table.board.length === 0){
        playerOne.betSmall();
        if (Math.random()>.01){
            playerTwo.betSmall();
            dealer.dealCards(3, table);
        } else {
            playerTwo.fold();
        } 
    } else {
        console.log('bet more, donkey!');
    }
});

betLargeBtn.addEventListener("click", () => {
    console.log('before', table)
    if (table.board.length >= 3 && table.board.length < 5){
        playerOne.betLarge();
        if (Math.random()>.1){
            playerTwo.betLarge()
            dealer.dealCards(1, table);
        } else {
            table.awardPot(playerOne)
            playerTwo.fold();
        }
    } else {
        console.log('cant bet that much yet')
    }
    console.log('after:', table)
    readHands();
}); 

bodyEl.appendChild(dealBtn)
bodyEl.appendChild(betSmallBtn)
bodyEl.appendChild(betLargeBtn)
/**
 * Remaining items:
 * Instruction modal
 * Win conditions
 * Display elements
 * 
 * Known bugs:
 * Bet
 */

function readHands(){
    let playerHand = []
    let computerHand = []
    for (let card of playerOne.board){
        playerHand.push(card)
    }
    for (let card of table.board){
        playerHand.push(card);
    }
    console.log('player hand:', playerHand);
    for (let card of playerTwo.board){
        computerHand.push(card)
    }
    for (let card of table.board){
        computerHand.push(card);
    }
    console.log('computer hand', computerHand);
    //grab ranks and suits
    
    //store ranks & suits in object

}