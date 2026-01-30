const randIndex = function(lastIndex) {
    return Math.floor(Math.random() * (lastIndex + 1));
}

let allCards = [ 
    "&#127136;", "&#127137;", "&#127138;", "&#127139;", "&#127140;", "&#127141;",
    "&#127142;", "&#127143;", "&#127144;", "&#127145;", "&#127146;", "&#127147;",
    "&#127148;", "&#127149;", "&#127150;", "&#127153;", "&#127154;", "&#127155;",
    "&#127156;", "&#127157;", "&#127158;", "&#127159;", "&#127160;", "&#127161;",
    "&#127162;", "&#127163;", "&#127164;", "&#127165;", "&#127166;", "&#127167;",
    "&#127169;", "&#127170;", "&#127171;", "&#127172;", "&#127173;", "&#127174;",
    "&#127175;", "&#127176;", "&#127177;", "&#127178;", "&#127179;", "&#127180;",
    "&#127181;", "&#127182;", "&#127183;", "&#127185;", "&#127186;", "&#127187;",
    "&#127188;", "&#127189;", "&#127190;", "&#127191;", "&#127192;", "&#127193;",
    "&#127194;", "&#127195;", "&#127196;", "&#127197;", "&#127198;", "&#127199;" ];

let cardBack = allCards[0];
allCards.shift();

let gameDeck = [];
for(let i = 0; i < 8; i++) {
    let lastIndex = allCards.length - 1;
    r = randIndex(lastIndex);
    gameDeck.push(allCards[r]);
    allCards.splice(r, 1);
}

let moveCount = 0;
const movesEl = document.querySelector("#moves");

function moves() {
  movesEl.textContent = "Moves: " + moveCount;
}
console.log(gameDeck);
let startTime = null;     
let timerId = null;       
let elapsedMs = 0;        

const timerEl = document.querySelector("#timer");
const resetBtn = document.querySelector("#resetBtn");

function renderTime(ms) {
  timerEl.textContent = "Time: " + (ms / 1000).toFixed(1) + "s";
}

function startTimer() {
  if (timerId) return;
  startTime = Date.now() - elapsedMs;
  timerId = setInterval(() => {
    elapsedMs = Date.now() - startTime;
    renderTime(elapsedMs);
  }, 100);
}

function stopTimer() {
  if (!timerId) return;
  clearInterval(timerId);
  timerId = null;
}

gameDeck = gameDeck.concat(gameDeck);

let currentPair = [];       
let lockBoard = false;     
let matches = 0;             
let matchedIdx = new Set();   

const handleClick = function(event) {
    console.log(event.target.id);
    if (lockBoard) return;
    startTimer();
    let cardIdx = event.target.id.slice(5);
    if (matchedIdx.has(cardIdx)) return;
    if (currentPair.length === 1 && currentPair[0].idx === cardIdx) return;
    event.target.innerHTML = gameDeck[cardIdx];
    currentPair.push({ idx: cardIdx, el: event.target, value: gameDeck[cardIdx] });
    if (currentPair.length === 2) {
        moveCount++;
        moves();
        const [a, b] = currentPair;
        

        if (a.value === b.value) {
            
            matchedIdx.add(a.idx);
            matchedIdx.add(b.idx);
            matches++;
            currentPair = [];

            if (matches === 8) {
                alert("You win!");
                stopTimer();
            }
        } else {
            lockBoard = true;
            setTimeout(() => {
                a.el.innerHTML = cardBack;
                b.el.innerHTML = cardBack;
                currentPair = [];
                lockBoard = false;
            }, 700);
        }
    }
}


function resetGame() {
  currentPair = [];
  lockBoard = false;
  matchedIdx = new Set();
  matches = 0;

  stopTimer();
  elapsedMs = 0;
  startTime = null;
  renderTime(0);
  moveCount = 0;
  moves();

  for (let i = 0; i < 16; i++) {
    const card = document.querySelector("#card-" + i);
    card.innerHTML = cardBack;
    card.onclick = handleClick;
  }
}

resetBtn.onclick = resetGame;

  for(let i = 0; i < 16; i++) {
    document.querySelector('#card-'+ i).onclick = handleClick;
  
  }


