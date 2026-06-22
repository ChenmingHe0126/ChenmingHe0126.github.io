// Get elements
const choices = document.querySelectorAll(".choice");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");
const resetButton = document.getElementById("reset");

// Possible choices
const choicesArray = ["Rock", "Paper", "Scissors"];

// Function to get a random computer choice
function getComputerChoice() {
    return choicesArray[Math.floor(Math.random() * choicesArray.length)];
}

// Function to determine the winner
function getResult(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "It's a tie! 🤝";
    }
    if (
        (userChoice === "Rock" && computerChoice === "Scissors") ||
        (userChoice === "Paper" && computerChoice === "Rock") ||
        (userChoice === "Scissors" && computerChoice === "Paper")
    ) {
        return "You win! 🎉";
    }
    return "You lose! 😢";
}

// Function to play the game
function playGame(userChoice) {
    const formattedChoice = userChoice.charAt(0).toUpperCase() + userChoice.slice(1); // Capitalize first letter
    const computerChoice = getComputerChoice();
    const result = getResult(formattedChoice, computerChoice);

    userChoiceDisplay.textContent = formattedChoice;
    computerChoiceDisplay.textContent = computerChoice;
    resultText.textContent = result;
}

// Set onclick events for each button
document.getElementById("rock").onclick = () => playGame("rock");
document.getElementById("paper").onclick = () => playGame("paper");
document.getElementById("scissors").onclick = () => playGame("scissors");

//reset button
resetButton.onclick = function (){
    userChoiceDisplay.textContent = "-";
    computerChoiceDisplay.textContent = "-";
    resultText.textContent = "-";
}
