// Global variables
const hands = [
  "High Card",
  "Pair",
  "Two Pair",
  "Three of a Kind",
  "Straight",
  "Flush",
  "Full House",
  "Four of a Kind",
  "Straight Flush",
];
const suits = ["spades", "hearts", "diamonds", "clubs"];
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const bodyEl = document.querySelector("body");
const playerDiv = document.createElement("div");
let playerStrengths = [];
playerDiv.classList.add("character");
bodyEl.appendChild(playerDiv);

// Classes
class Table {
  constructor(players) {
    this.players = players;
    this.board = [];
    this.pot = 0;
  }

  awardPot(player) {
    player.chipCount += this.pot;
    this.pot = 0;
    this.clearBoards();
  }

  clearBoards() {
    // setTimeout(() => {
    //   let allCards = document.querySelectorAll(".card");
    //   for (let card of allCards) {
    //     bodyEl.removeChild(card);
    //   }
    // }, 1000);
    this.board = [];
    for (let player of this.players) {
      player.board = [];
      player.bet = 0;
    }
  }

  assembleHands(player) {
    for (let card of this.board) {
      player.board.push(card);
    }
  }

  readHands() {
    console.log("read hands ran");
    for (let player of this.players) {
      let instances = this.countPlayerCards(player.board);
      const straightFlush = this.checkStraightFlush(instances);
      if (straightFlush === true) {
        player.handStrength = 9;
        return player;
      }
      const quads = this.checkQuads(instances);
      if (quads === true) {
        player.handStrength = 8;
      }
      const boat = this.checkBoat(instances);
      if (boat === true) {
        player.handStrength = 7;
      }
      const flush = this.checkFlush(instances);
      if (flush === true) {
        player.handStrength = 6;
      }
      const straight = this.checkStraight(instances);
      if (straight === true) {
        player.handStrength = 5;
      }
      const trips = this.checkTrips(instances);
      if (trips === true) {
        player.handStrength = 4;
      }
      const twoPair = this.checkTwoPair(instances);
      if (twoPair === true) {
        player.handStrength = 3;
      }
      const pair = this.checkPair(instances);
      if (pair === true) {
        player.handStrength = 2;
      }
      const highCard = this.checkHighCard(instances);
      if (highCard === true) {
        player.handStrength = 1;
      }
    }
  }

  checkStraightFlush(instances) {
    if (
      this.checkStraight(instances) === true &&
      this.checkFlush(instances) === true
    ) {
      return true;
    }
    return false;
  }
  checkQuads(instances) {
    // console.log("check quads");
    for (let rank of ranks) {
      if (instances[rank] && instances[rank] === 4) return true;
    }
    return false;
  }

  checkBoat(instances) {
    // console.log("check boat");
    for (let rank of ranks) {
      if (instances[rank] && instances[rank] === 3) {
        for (let rank of ranks) {
          if (instances[rank] && instances[rank] === 2) return true;
        }
      }
    }
    return false;
  }

  checkFlush(instances) {
    // console.log("check flush");
    for (let suit of suits) {
      if (instances[suit] && instances[suit] >= 5) {
        return true;
      } else {
        return false;
      }
    }
  }

  checkStraight(instances) {
    // console.log("check straight");
    for (let rank of ranks) {
      if (
        instances[rank] &&
        instances[rank + 1] &&
        instances[rank + 2] &&
        instances[rank + 3] &&
        instances[rank + 4]
      ) {
        return true;
      }
    }
    return false;
  }

  checkTrips(instances) {
    // console.log("check trips");
    for (let rank of ranks) {
      if (instances[rank] && instances[rank] === 3) return true;
    }
    return false;
  }

  checkTwoPair(instances) {
    // console.log("check two pair");
    for (let rank of ranks) {
      if (instances[rank] && instances[rank] === 2) {
        for (let i = rank + 1; i < 16; i++) {
          if (instances[i] && instances[i] === 2) return true;
        }
      }
    }
    return false;
  }

  checkPair(instances) {
    // console.log("check pair");
    for (let rank of ranks) {
      if (instances[rank] && instances[rank] === 2) return true;
    }
    return false;
  }

  checkHighCard(instances) {
    if (
      this.checkStraightFlush(instances) === false &&
      this.checkQuads(instances) === false &&
      this.checkBoat(instances) === false &&
      this.checkFlush(instances) === false &&
      this.checkStraight(instances) === false &&
      this.checkTrips(instances) === false &&
      this.checkTwoPair(instances) === false &&
      this.checkPair(instances) === false
    ) {
      return true;
    }
    return false;
  }

  countPlayerCards(playerCards) {
    let playerHand = {};
    for (let i = 0; i < playerCards.length; i++) {
      let rankKey = playerCards[i].rank;
      let suitKey = playerCards[i].suit;
      if (playerHand[rankKey]) {
        playerHand[rankKey]++;
      } else {
        playerHand[rankKey] = 1;
      }
      if (playerHand[suitKey]) {
        playerHand[suitKey]++;
      } else {
        playerHand[suitKey] = 1;
      }
    }
    // console.log("countPlayerCards ran", playerHand);
    return playerHand;
  }
}

class Player {
  constructor(name, chipCount) {
    this.name = name;
    this.chipCount = chipCount;
    this.bet = 0;
    this.board = [];
    this.handStrength = 0;
  }

  betSmall() {
    this.chipCount -= 5;
    this.bet += 5;
  }

  betLarge() {
    this.chipCount -= 10;
    this.bet += 10;
  }

  fold() {
    console.log("Opponent Folds, You Win!");
  }
}

class Dealer extends Table {
  constructor(players) {
    super(players);
    this.deck = [];
    for (let suit in suits) {
      for (let rank in ranks) {
        const card = {
          rank: `${ranks[rank]}`,
          suit: `${suits[suit]}`,
        };
        this.deck.push(card);
      }
    }
    this.shuffle();
  }
  shuffle() {
    let count = this.deck.length;
    while (count != 0) {
      let randomIndex = Math.floor(Math.random() * count);
      count--;
      [this.deck[count], this.deck[randomIndex]] = [
        this.deck[randomIndex],
        this.deck[count],
      ];
      count--;
    }
  }

  dealCards(num, target) {
    const nextCards = this.deck.splice(0, num);
    for (let card of nextCards) {
      target.board.push(card);
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card", `${card.suit}`);
      cardDiv.textContent = `${card.rank} of ${card.suit}`;
      bodyEl.appendChild(cardDiv);
    }
  }
}

//Buttons

const dealBtn = document.createElement("button");
dealBtn.textContent = "Deal";
dealBtn.classList.add("btn");

const betSmallBtn = document.createElement("button");
betSmallBtn.textContent = "Bet 5";
betSmallBtn.classList.add("btn");

const betLargeBtn = document.createElement("button");
betLargeBtn.textContent = "Bet 10";
betLargeBtn.classList.add("btn");

let dealer = new Dealer();
const playerOne = new Player("playerOne", 1000);
const playerTwo = new Player("playerTwo", 1000);
const table = new Table([playerOne, playerTwo]);

// Event Listeners
dealBtn.addEventListener("click", () => {
  if (playerOne.board.length === 2) {
    console.log("player hands full");
  } else {
    dealer.dealCards(2, playerOne);
    dealer.dealCards(2, playerTwo);
  }
  console.log("dealt cards", playerOne.board, playerTwo.board);
});

betSmallBtn.addEventListener("click", () => {
  if (table.board.length === 0) {
    playerOne.betSmall();
    if (Math.random() > 0.01) {
      playerTwo.betSmall();
      dealer.dealCards(3, table);
    } else {
      playerTwo.fold();
      table.pot = playerOne.bet + playerTwo.bet;
      table.awardPot(playerOne);
    }
  } else {
    console.log("bet more, donkey!");
  }
});

betLargeBtn.addEventListener("click", () => {
  if (table.board.length === 3 || table.board.length === 4) {
    playerOne.betLarge();
    if (Math.random() > 0.01) {
      playerTwo.betLarge();
      dealer.dealCards(1, table);
    } else {
      playerTwo.fold();
      table.pot = playerOne.bet + playerTwo.bet;
      table.awardPot(playerOne);
      console.log("playerTwo folds");
    }
  } else if (table.board.length >= 5) {
    if (Math.random() > 0.01) {
      playerTwo.betLarge();
      table.pot = playerOne.bet + playerTwo.bet;
      table.assembleHands(playerOne);
      table.assembleHands(playerTwo);
      table.readHands();
      if (playerOne.handStrength > playerTwo.handStrength) {
        table.awardPot(playerOne);
        dealer = new Dealer();
        console.log(playerOne, playerTwo);
      } else {
        table.awardPot(playerTwo);
        dealer = new Dealer();
        console.log(playerOne, playerTwo);
      }
    } else {
      playerTwo.fold();
      table.pot = playerOne.bet + playerTwo.bet;
      table.awardPot(playerOne);
      console.log("playerTwo folds");
    }
  } else {
    console.log(`why are there ${table.board.length} cards on the table`);
  }
});

bodyEl.appendChild(dealBtn);
bodyEl.appendChild(betSmallBtn);
bodyEl.appendChild(betLargeBtn);

// function readHands(){
//     // assemble the distinct hands
//     let playerHand = []
//     let computerHand = []
//     let playerRanks = [];
//     let playerSuits = [];
//     for (let card of playerOne.board){
//         playerHand.push(card)
//     }
//     for (let card of table.board){
//         playerHand.push(card);
//     }
//     console.log('player hand:', playerHand);

//     for (let card of playerHand){
//         playerRanks.push(card.rank);
//     }
//     for (let card of playerTwo.board){
//         computerHand.push(card)
//     }
//     for (let card of table.board){
//         computerHand.push(card);
//     }
//     console.log('computer hand', computerHand);
//     for (let card of playerHand){
//         playerRanks.push(card.rank);
//         playerSuits.push(card.suit);
//     }
//     for (let i=0; i < playerRanks.length; i++){
//     }
/* -------------------------------------------------------------------------- */

// mission: iterate through each 7-card hand, evaluate to find the best 5 card hand, declare owner of that hand the winner, award them the chipCount, reset

// Straight-Flush: 5 consecutive ranks all of which are of the same suit
// for (let i=0; i< playerSuits.length; i++){
//     let suitCount = 0
//     for (let suit of playerSuits){
//         if (playerSuit[i] === playerSuit[i+1]){
//             suitCount++
//         }
//     }
// }
// Quads: 4 of one rank
// Boat: 3 of a kind + pair
// Flush: 5 of any one suit
// Straight: 5 consecutive ranks
// 3 of a Kind: exactly 3 of one rank
// 2 Pair: exactly 2 of exactly 2 different ranks
// Pair: exactly 2 of any one rank
// for (let i=0; i < playerRanks.length; i++){
//     let rankCount = 0
//     if (playerRank[i] === playerRank[i+1]){
//         rankCount++
//     }
// }
// High-card: Highest rank in the hand
//}
