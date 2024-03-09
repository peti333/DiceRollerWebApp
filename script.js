const table = document.querySelector("#table")
const numOfDice = document.querySelector("#numOfDice")
const rollButton = document.querySelector("#rollButton")

rollButton.addEventListener("click",rollTable)



function rollTable(e){

    table.innerHTML = ""
    //table.addEventListener("click",onTableClick)
    let num = parseInt(numOfDice.value)
    const rowNumber = Math.ceil(num / 10)
    const colNumber = num > 10 ? 10 : num

    let random = 0

    for(let i = 0; i < rowNumber; i++){
        
        let newRow = table.insertRow()
        for(let j = 0; j < colNumber; j++){
            let newCol = document.createElement("td")
            let random = Math.floor(Math.random() * 6) + 1; // Add 1 to get numbers from 1 to 6
            newCol.dataset.value = random;
            newCol.classList.add("dice-" + random); // Add a class to style the cell based on the rolled number
            newRow.appendChild(newCol); // Append the newCol directly to newRow

        }
    }
    updateResults()


}


const selectButton = document.querySelector("#selectButton");
const rerollSelectedButton = document.querySelector("#rerollSelectedButton");
const rerollValueInput = document.querySelector("#rerollValue");
const resultsOutput = document.querySelector("#results");
const rerollButton = document.querySelector("#rerollButton")
let selectedDice = [];
let selectButtonClicked = false; // Define selectButtonClicked variable

table.addEventListener("click", tableClick);
rollButton.addEventListener("click", rollTable);
selectButton.addEventListener("click", selectDice);
rerollSelectedButton.addEventListener("click", rerollSelected);
rerollButton.addEventListener("click", rerollWithValue);

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
    