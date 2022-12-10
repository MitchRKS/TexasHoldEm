Technologies Used:
HTML
CSS
JavaScript
Flexbox

Approach Taken:
Being familiar with the game of texas hold'em, I followed the step-by-step process as if I was populating a virtual card room.
First we made 3 Classes: Table, Player, and Dealer. Each has their own unique methods and properties, although there is overlap since the Dealer extends Table.
When the page loads, the table, dealer, and two players will already be there. This is where the user takes control of playerOne. User can click to deal cards to themself and computer. A percentage of the time, the computer will call and they will move on to the flop. The player can choose to bet or fold. This pattern repeats until all community cards are dealt.
After the final decision to bet has been made and selected by User, if computer calls then the hands are read. The community cards are added to each player board, then the ranks and suits are read and counted. These values are then passed through another counter to determine whether the hand contains a pair, two pair, flush etc...
Each outcome of the hand reader has a different value assigned to it. The stronger/rarer the hand, the higher the value. Highest value wins, tie goes to the computer.
User may add chips at any time in increments of 100 by clicking a button.
Game ends with an alert that User is out of chips, but User can elect to add more (see above).

Installation instructions:
Open the following link in a Chrome browser: https://mitchrks.github.io/TexasHoldEm/

Known bugs:
Hand reader could identify a false positive for straightFlush if both a straight and flush are present, but not in such a way that creates an actual straightFlush (very rare).
Only checks for the type of hand created. Does not differentiate between different hands of the same type.
