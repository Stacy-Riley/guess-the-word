//UL where players guesses will appear:
const guessedLettersElement = document.querySelector(".guessed-letters");
//Button to make guess:
const buttonToGuess = document.querySelector(".guess");
//Text input where the player will guess a letter:
const inputLetterHere = document.querySelector(".letter");
//The empty paragraph where the word in progress will appear:
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display:
let remainingGuessesElement = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display:
const spanInRemainingGuesses = document.querySelector("span");
//The empty paragraph where messages will appear when the player guesses a letter:
const guessMessage = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again:
const buttonToPlayAgain = document.querySelector(".play-again");

//First Test word:
let word = "magnolia";
const guessedLettersArray = [];
let remainingGuesses = 8;


//Function to capture api of random words:
const getWord = async function(){
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    const wordArray = words.split("\n");
    
    //To get a random index of a word from the wordArray:
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    
    word = wordArray[randomIndex].trim();
    placeHolder(word);
};

//This starts the game:
getWord();


//Function to create placeholder for each letter of the hidden word:
const placeHolder = function(word){
    const wordLetterArray = [];
   
    for(let letter of word){
        wordLetterArray.push("●");
    }

    wordInProgress.innerText = wordLetterArray.join(""); //removes the , between the array of letters/"●"   
};




//Function to run when guess button is pressed:
buttonToGuess.addEventListener("click", function(e){
    e.preventDefault(); //To prevent the page from reloading
     guessMessage.innerText = ""; //clears guessMessage field after each click
    let input = inputLetterHere.value;
    
    validateInput(input);
    const letter = validateInput(input);

    //will execute only if we get a valid letter - undefined message goes no further
    if(letter){
        makeGuess(letter);  
    }
    inputLetterHere.value = "";
});

//Function to verify the user's input:
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
  
//Function to validate users letter isn't a duplicate than pushs letter to "guessedLettersArray":
const makeGuess = function(letter){
    letter = letter.toUpperCase();

    //prevents duplicate letters from entering the array
    if(guessedLettersArray.includes(letter)){
            guessMessage.innerText = "Uh-oh, you've guessed that letter already"
        } else {
            guessedLettersArray.push(letter);
            // console.log(guessedLettersArray);

            countRemainingGuesses(letter);
            guessedLettersDisplay(); //took letter out here from callback
            matchWords(guessedLettersArray) //guessedLetters 
        }
};

//Function to display the users guesses inside "guessedLettersElement":
const guessedLettersDisplay = function(){
    //Clear the list first
    guessedLettersElement.innerHTML = "";
    
    
    for(let letter of guessedLettersArray){
        let li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);    
    }
};

//Function to update the word in progress that matches wordArray with guessedLettersArray:
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
        didPlayerWin();      
};

//Function to count guesses and display the guesses left or tell if they lost the game:
const countRemainingGuesses = function(letter){
    
    let wordUpper = word.toUpperCase()
        if(!wordUpper.includes(letter)){
            remainingGuessesElement.innerText = `Sorry the word has no ${letter}`;
            remainingGuesses -=1;
        } else {
            remainingGuessesElement.innerText = `Good guess. The word has the letter ${letter}`
        }

        if (remainingGuesses === 0){
            remainingGuessesElement.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        } else if (remainingGuesses === 1){
            remainingGuessesElement.innerHTML = "You have <span> 1 </span>guess left.";        
        } else {
            spanInRemainingGuesses.innerText = `${remainingGuesses} guesses`
        }
};

//Function to Check If the Player Won:
const didPlayerWin = function(){ 
    if(word.toUpperCase() === wordInProgress.innerText){
        guessMessage.classList.add("win", "highlight");
        guessMessage.innerText = "You guessed the correct word! Congrats!";   
    }
};


