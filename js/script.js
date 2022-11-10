//UL where players guesses will appear:
const guessedLetters = document.querySelector(".guessed-letters");
//Button to make guess:
const buttonToGuess = document.querySelector(".guess");
//Text input where the player will guess a letter:
const inputLetterHere = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear:
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display:
const remainingGuesses = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display:
const spanInRemainingGuesses = document.querySelector("span");
//The empty paragraph where messages will appear when the player guesses a letter:
const guessMessage = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again:
const buttonToPlayAgain = document.querySelector(".play-again");



//First Test word:
const word = "magnolia";

//Function to create circle placeholder for hidden word user will guess on:
const placeHolder = function(){
    const wordLetterArray = [];
   
    for(let letter of word){
        wordLetterArray.push("●");
    }
    // wordInProgress.append(wordLetterArray.join(""); -works too
    wordInProgress.innerText = wordLetterArray.join("");     
};

placeHolder(word);


//Function to run when guess button is pressed:
buttonToGuess.addEventListener("click", function(e){
    e.preventDefault(); //To prevent the page from reloading
    let userInput = inputLetterHere.value;
    console.log(userInput);
    inputLetterHere.value = "";
});