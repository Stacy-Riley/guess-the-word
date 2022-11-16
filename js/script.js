//UL where players guesses will appear:
const guessedLettersElement = document.querySelector(".guessed-letters");
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
const guessedLettersArray = [];

//Function to create circle placeholder for hidden word user will guess on:
const placeHolder = function(){
    const wordLetterArray = [];
   
    for(let letter of word){
        wordLetterArray.push("●");
    }

    wordInProgress.innerText = wordLetterArray.join(""); //removes the , between the array of letters/"●"   
};

placeHolder(word);


//Function to run when guess button is pressed:
buttonToGuess.addEventListener("click", function(e){
    e.preventDefault(); //To prevent the page from reloading
    // guessMessage.innerText = ""; //clears guessMessage field after each click
    let input = inputLetterHere.value;
    
    validateInput(input);
    const letter = validateInput(input);

    inputLetterHere.value = "";

    //will execute only if we get a valid letter - undefined message goes no further
    if(letter){
        makeGuess(letter);  
    }
});

//Function to verify the user's input.
const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/; //regular expression to ensure the player inputs a letter
    // const nonLetter = /\d/; //non-letter character

    if(input === ""){
        guessMessage.innerText = "Please pick a letter";       
    } else if (input.length > 1){
        guessMessage.innerText = "Enter only one letter";
    } else if(!input.match(acceptedLetter)){
        guessMessage.innerText = "Enter a letter A-Z";
    } else {
        return input;
    }  
};
  
//Function to validate users letter isn't a duplicate than pushs letter to "guessedLettersArray"
const makeGuess = function(letter){
    letter = letter.toUpperCase();

    //prevents duplicate letters from entering the array
    if(guessedLettersArray.includes(letter)){
            guessMessage.innerText = "Uh-oh, you've guessed that letter already"
        } else {
            guessedLettersArray.push(letter);
            // console.log(guessedLettersArray);
            
            guessedLettersDisplay(letter);
            matchWords(guessedLettersArray) //guessedLetters
        }
}

//Function to display the users guesses inside "guessedLettersElement"
const guessedLettersDisplay = function(){
    guessedLettersElement.innerHTML = "";
    
    
    for(let letter of guessedLettersArray){
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li)
        
    }
}

//function to update the word in progress that matches wordArray with guessedLettersArray
const matchWords = function(guessedLettersArray){
    const wordUpper = word.toUpperCase();
    
    //Turn the "word" string into an array
    const wordArray = wordUpper.split("");
    
    //This will capture the matched letters between the 2 arrays
    let results = [];

   //comparing the 2 arrays, wordArray from api and user guesses that are in an array
    for (let letter of wordArray) {
        if (guessedLettersArray.includes(letter)) {
            results.push(letter.toUpperCase()); //push the letter that matches
            
        } else {
            results.push("●");//if a matching letter is not present, this line pushs the circle for the letter
        }
    }
        // removes the commas of the string so they aren't displayed on the screen
        wordInProgress.innerText = results.join("");  

        //run function to check if user won
        didPlayerWin(results);
        
        return results;       
}

//Function to Check If the Player Won
const didPlayerWin = function(results){
    if(!results.includes("●")){
        wordInProgress.classList.add("win", "highlight")
        wordInProgress.innerText = "You guessed the correct word! Congrats!"   
    }
}  

