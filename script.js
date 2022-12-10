// Global variables
let playerList = [];
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

// Classes
class Table {
  constructor(players) {
    this.players = players;
    this.board = [];
    this.pot = 0;
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
    for (let rank of ranks) {
      if (instances[rank] && instances[rank] === 4) return true;
    }
    return false;
  }

  checkBoat(instances) {
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
    for (let suit of suits) {
      if (instances[suit] && instances[suit] >= 5) {
        return true;
      } else {
        return false;
      }
    }
  }

  checkStraight(instances) {
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
    for (let rank of ranks) {
      if (instances[rank] && instances[rank] === 3) return true;
    }
    return false;
  }

  checkTwoPair(instances) {
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
    return playerHand;
  }

  renderStacks() {
    console.log("render stack ran");
    for (let player of playerList) {
      const playerDiv = document.createElement("div");
      const playerChipDisplay = document.createElement("p");
      playerChipDisplay.innerHTML = `${player.name} has ${player.chipCount} chips.`;
      playerDiv.appendChild(playerChipDisplay);
      bodyEl.appendChild(playerDiv).classList.add(`${player.name}`);
    }
  }

  updateStacks() {
    for (let player of this.players) {
      let chipDisplay = document.querySelector(`.${player.name}`);
      chipDisplay.innerHTML = `${player.name} has ${player.chipCount} chips.`;
    }
  }

  awardPot(player) {
    player.chipCount += this.pot;
    this.pot = 0;
    this.updateStacks();
    this.clearBoards();
  }

  clearBoards() {
    let compCards = document.querySelectorAll(".hidden");
    for (let card of compCards) {
      card.classList.remove("hidden");
    }
    setTimeout(() => {
      let allCards = document.querySelectorAll(".card");
      for (let card of allCards) {
        bodyEl.removeChild(card);
      }
    }, 5000);
    this.board = [];
    for (let player of this.players) {
      player.board = [];
      player.bet = 0;
      player.handStrength = 0;
    }
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
    this.board = [];
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

  dealCards(num, target, owner) {
    const nextCards = this.deck.splice(0, num);
    for (let card of nextCards) {
      target.board.push(card);
      let cardDiv = document.createElement("div");
      cardDiv.classList.add("card", `${card.suit}`);
      cardDiv.textContent = `${owner}: ${card.rank} of ${card.suit}`;
      if (owner === playerTwo.name) {
        cardDiv.classList.add("hidden", "compCard");
      } else if (owner === playerOne.name) {
        cardDiv.classList.add("hole");
      } else {
        cardDiv.classList.add("community");
      }
      bodyEl.appendChild(cardDiv);
    }
  }
}

//Buttons

const dealBtn = document.createElement("button");
dealBtn.textContent = "Deal";
dealBtn.classList.add("btn");

const foldBtn = document.createElement("button");
foldBtn.textContent = "Fold";
foldBtn.classList.add("btn");

const betSmallBtn = document.createElement("button");
betSmallBtn.textContent = "Bet 5";
betSmallBtn.classList.add("btn");

const betLargeBtn = document.createElement("button");
betLargeBtn.textContent = "Bet 10";
betLargeBtn.classList.add("btn");

const resetBtn = document.createElement("button");
resetBtn.textContent = "Get More Chips";
resetBtn.classList.add("btn");

// Instantiations
let dealer = new Dealer();
let playerOne = new Player("playerOne", 100);
playerList.push(playerOne);
const playerTwo = new Player("playerTwo", 1000);
playerList.push(playerTwo);
const table = new Table([playerOne, playerTwo]);

console.log(playerList);
table.renderStacks();

// Event Listeners
dealBtn.addEventListener("click", () => {
  if (playerOne.chipCount <= 0) {
    return alert("hit the bricks, kid");
  }
  if (playerOne.board.length === 2) {
    console.log("player hands full");
  } else {
    playerOne.betSmall();
    playerTwo.betSmall();
    table.updateStacks();
    dealer.dealCards(2, playerOne, playerOne.name);
    dealer.dealCards(2, playerTwo, playerTwo.name);
  }
});

foldBtn.addEventListener("click", () => {
  playerOne.fold();
  table.awardPot(playerTwo);
  table.updateStacks();
});

betSmallBtn.addEventListener("click", () => {
  if (playerOne.board.length === 0) {
    return alert("you dont even have any cards yet");
  }
  if (table.board.length === 0) {
    playerOne.betSmall();
    table.updateStacks();
    if (Math.random() > 0.001) {
      playerTwo.betSmall();
      table.updateStacks();
      dealer.dealCards(3, table, "flop");
    } else {
      table.pot = playerOne.bet + playerTwo.bet;
      table.awardPot(playerOne);
      playerTwo.fold();
    }
  } else {
    console.log("bet more, donkey!");
  }
});

betLargeBtn.addEventListener("click", () => {
  if (table.board.length < 3) {
    return alert("the flop hasnt been dealt yet");
  }
  if (table.board.length === 3) {
    playerOne.betLarge();
    table.updateStacks();
    if (Math.random() > 0.01) {
      playerTwo.betLarge();
      table.updateStacks();
      dealer.dealCards(1, table, "turn");
    } else {
      table.pot = playerOne.bet + playerTwo.bet;
      table.awardPot(playerOne);
      playerTwo.fold();
    }
  } else if (table.board.length === 4) {
    playerOne.betLarge();
    if (Math.random() > 0.01) {
      playerTwo.betLarge();
      table.updateStacks();
      dealer.dealCards(1, table, "river");
    } else {
      table.pot = playerOne.bet + playerTwo.bet;
      table.awardPot(playerOne);
      playerTwo.fold();
    }
  } else if (table.board.length >= 5) {
    if (Math.random() > 0.01) {
      playerTwo.betLarge();
      table.updateStacks();
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

resetBtn.addEventListener("click", () => {
  playerOne.chipCount += 100;
});

bodyEl.appendChild(dealBtn);
bodyEl.appendChild(foldBtn);
bodyEl.appendChild(betSmallBtn);
bodyEl.appendChild(betLargeBtn);
bodyEl.appendChild(resetBtn);
