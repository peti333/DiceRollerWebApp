// I N P U T S

const table = document.querySelector("#table")
const numOfDice = document.querySelector("#numOfDice")
const rollButton = document.querySelector("#rollButton")
const selectButton = document.querySelector("#selectButton");
const rerollSelectedButton = document.querySelector("#rerollSelectedButton");
const rerollValueInput = document.querySelector("#rerollValue");
const resultsOutput = document.querySelector("#results");
const rerollButton = document.querySelector("#rerollButton")

// E V E N T S

table.addEventListener("click", tableClick);
rollButton.addEventListener("click", rollTable);
selectButton.addEventListener("click", selectDice);
rerollSelectedButton.addEventListener("click", rerollSelected);
rerollButton.addEventListener("click", rerollWithValue);
rollButton.addEventListener("click",rollTable)

// G L O B A L  V A R I A B L E S

let selectedDice = [];
let selectButtonClicked = false;

// F U N C T I O N S

function rollTable(e) {
    table.innerHTML = "";
    let num = parseInt(numOfDice.value);

    
    const colNumber = Math.min(num, 10); 
    const rowNumber = Math.ceil(num / 10); 

    let remainingDice = num;

    for (let i = 0; i < rowNumber; i++) {
        let newRow = table.insertRow();
        for (let j = 0; j < colNumber; j++) {
            if (remainingDice > 0) { 
                let newCol = document.createElement("td");
                let random = Math.floor(Math.random() * 6) + 1;
                newCol.dataset.value = random;
                newCol.classList.add("dice-" + random);
                newRow.appendChild(newCol);
                remainingDice--;
            }
        }
    }
    updateResults();
}



function tableClick(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === "TD") {
        if (selectedDice.includes(clickedElement)) {
            // If the clicked dice is already selected, deselect it
            clickedElement.classList.remove("selected");
            selectedDice = selectedDice.filter(dice => dice !== clickedElement);
        } else {
            // If the select button wasn't clicked, reroll the dice
            if (!selectButtonClicked) {

                const random = Math.floor(Math.random() * 6) + 1;
                clickedElement.dataset.value = random;
                clickedElement.classList.remove("selected");
                clickedElement.classList.remove("dice-1");
                clickedElement.classList.remove("dice-2");
                clickedElement.classList.remove("dice-3");
                clickedElement.classList.remove("dice-4");
                clickedElement.classList.remove("dice-5");
                clickedElement.classList.remove("dice-6");
                clickedElement.classList.add("dice-" + random);
                //For animation restart
                const elm = clickedElement;
                var newone = elm.cloneNode(true);
                elm.parentNode.replaceChild(newone, elm);
                updateResults();
            } else {
                clickedElement.classList.add("selected");
                selectedDice.push(clickedElement);
            }
        }
    }
}

function selectDice() {
    selectButtonClicked = !selectButtonClicked;
    if(selectButtonClicked){
        selectButton.classList.add("selectClicked")
    }
    else{
        selectButton.classList.remove("selectClicked")
    }
}

function rerollSelected() {
    selectedDice.forEach(dice => {
        const random = Math.floor(Math.random() * 6) + 1;
        dice.dataset.value = random;
        dice.classList.remove("selected");
        dice.classList.remove("dice-1");
        dice.classList.remove("dice-2");
        dice.classList.remove("dice-3");
        dice.classList.remove("dice-4");
        dice.classList.remove("dice-5");
        dice.classList.remove("dice-6");
        dice.classList.add("dice-" + random);
        //For animation restart
        const elm = dice;
        var newone = elm.cloneNode(true);
        elm.parentNode.replaceChild(newone, elm);
        
        updateResults();
    });
    selectDice()
    selectedDice = [];
}

function rerollWithValue() {
    const rerollThreshold = parseInt(rerollValueInput.value);
    const allDice = table.querySelectorAll("td");
    allDice.forEach(dice => {
        const currentValue = parseInt(dice.dataset.value);
        if (currentValue <= rerollThreshold) {
            const random = Math.floor(Math.random() * 6) + 1;
            dice.dataset.value = random;
            dice.classList.remove("selected");
            dice.classList.remove("dice-1");
            dice.classList.remove("dice-2");
            dice.classList.remove("dice-3");
            dice.classList.remove("dice-4");
            dice.classList.remove("dice-5");
            dice.classList.remove("dice-6");
            dice.classList.add("dice-" + random);
            //For animation restart
            const elm = dice;
            var newone = elm.cloneNode(true);
            elm.parentNode.replaceChild(newone, elm);
            updateResults();
        }
    });
}

function updateResults() {
    const allDice = table.querySelectorAll("td");
    const results = {};

    
    allDice.forEach(dice => {
        const value = dice.dataset.value;
        results[value] = results[value] ? results[value] + 1 : 1;
    });


    resultsOutput.innerHTML = "";

    
    for (let value in results) {
        const listItem = document.createElement("li");
        listItem.textContent = value + ": " + results[value];
        resultsOutput.appendChild(listItem);
    }
}
    