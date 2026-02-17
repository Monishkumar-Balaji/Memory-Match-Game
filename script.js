const images = [
    "cat.jpg","dog.jpg","panda.jpg",
    "teddy.jpg","dolphin.jpg","chick.png"
];

let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;
let totalPairs = 0;

let timeLeft = 0;
let timerInterval;

document.getElementById("startForm").addEventListener("submit", startGame);

function startGame(e){
    e.preventDefault();

    const level = document.querySelector('input[name="level"]:checked');
    if(!level){
        alert("Choose level");
        return;
    }

    const pairs = parseInt(level.value); // 2,4,6
    totalPairs = pairs;                  // number of pairs to match
    matches = 0;

    setTime(pairs);
    buildBoard(pairs);
}

function setTime(pairs){
    if(pairs===2) timeLeft = 15;
    if(pairs===4) timeLeft = 30;
    if(pairs===6) timeLeft = 45;

    document.getElementById("timer").textContent = "Time: " + timeLeft;

    clearInterval(timerInterval);
    timerInterval = setInterval(()=>{
        timeLeft--;
        document.getElementById("timer").textContent = "Time: " + timeLeft;

        if(timeLeft<=0){
            clearInterval(timerInterval);
            alert("LOST!");
            lock = true;
        }
    },1000);
}

function buildBoard(pairs){
    const board = document.getElementById("board");
    board.innerHTML = "";

    // grid columns (2 pairs → 2 columns, etc)
    board.style.gridTemplateColumns = `repeat(${pairs},1fr)`;

    // choose images equal to number of pairs
    let chosen = images.slice(0,pairs);

    // duplicate for matching pairs
    let gameImages = [...chosen, ...chosen];

    // shuffle
    gameImages.sort(()=>Math.random()-0.5);

    for(let img of gameImages){
        const card = document.createElement("div");
        card.className = "card";

        const image = document.createElement("img");
        image.src = "images/blank.jpg";
        image.dataset.actual = "images/" + img;

        card.appendChild(image);
        card.addEventListener("click", handleClick);

        board.appendChild(card);
    }
}

function handleClick(){
    if(lock) return;

    const img = this.querySelector("img");

    if(img===firstCard) return;

    img.src = img.dataset.actual;

    if(!firstCard){
        firstCard = img;
        return;
    }

    secondCard = img;
    checkMatch();
}

function checkMatch(){
    if(firstCard.dataset.actual === secondCard.dataset.actual){
        matches++;
        firstCard.parentElement.style.background =
                "linear-gradient(135deg,#43e97b,#38f9d7)";
        secondCard.parentElement.style.background =
                "linear-gradient(135deg,#43e97b,#38f9d7)";
        resetTurn();


        if(matches === totalPairs){
            clearInterval(timerInterval);
            setTimeout(()=>alert("WON!"),300);
        }
    } else {
        lock = true;
        setTimeout(()=>{
            firstCard.src = "images/blank.jpg";   // FIXED
            secondCard.src = "images/blank.jpg";  // FIXED
            resetTurn();
        },1000);
    }
}

function resetTurn(){
    firstCard=null;
    secondCard=null;
    lock=false;
}

function restartGame(){
    clearInterval(timerInterval);
    document.getElementById("board").innerHTML="";
    document.getElementById("timer").textContent="Time: 0";
}
