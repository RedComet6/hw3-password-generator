// associates the button in the html to a variable for use in creating an event listener on the button
let generateBtn = document.querySelector("#generate");

//globally defined arrays of all possible characters to pass through pw generator
let lcLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let ucLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let pwNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let specChars = ["!", "#", "$", "%", "&", "*", "+", "-", "<", "=", ">", "?", "@", "^", "_", "~"];

// function to take inputs from user, run processes to manipulate data, and return a final password as a string
function generatePassword() {
    // initializing an array of all possible characters to be used in the password, subject to user's input
    let pwBank = [];
    // initializing an array representing the final password, that will pick and choose random elements from the bank of possible choices
    let pwActive = [];
    // obtains the desired password length from the user, and assigns a variable for its use
    let pwLength = prompt("Passwords should be between 8 and 128 chracters long. How long of a password would you like?");

    // checks if desired password length is within the acceptable limit of 8-128 characters
    // if desired length is too short or too long, will alert user and return null to force a resubmission from user
    // if deisred length is within limits, continues to pull input from user about which character sets are desired in the password
    if (pwLength < 8 || pwLength > 128) {
        alert("Please choose a password length between 8 and 128 characters");
        return null;
    } else {
        let useLower = confirm("Do you want lowercase letters to be used?");
        let useUpper = confirm("Do you want upper case letters to be used?");
        let useNumbers = confirm("Do you want numbers to be used?");
        let useSpec = confirm("Do you want special characters to be used?");

        // checks if user chose to include lowercase letters. if true, adds lowercase letters to the bank of possible characters
        // if true, adds a single random element from the lowercase letters array to active password, to ensure that every desired character type has at least one representative in final password
        if (useLower === true) {
            pwBank = pwBank.concat(lcLetters);
            let randomItem = lcLetters[Math.floor(Math.random() * lcLetters.length)];
            pwActive.push(`${randomItem}`);
        }

        // checks if user chose to include uppercase letters. if true, adds uppercase letters to the bank of possible characters
        // if true, adds a single random element from the uppercase letters array to active password, to ensure that every desired character type has at least one representative in final password
        if (useUpper === true) {
            pwBank = pwBank.concat(ucLetters);
            let randomItem = ucLetters[Math.floor(Math.random() * ucLetters.length)];
            pwActive.push(`${randomItem}`);
        }

        // checks if user chose to include numbers. if true, adds numbers to the bank of possible characters
        // if true, adds a single random element from the numbers array to active password, to ensure that every desired character type has at least one representative in final password
        if (useNumbers === true) {
            pwBank = pwBank.concat(pwNumbers);
            let randomItem = pwNumbers[Math.floor(Math.random() * pwNumbers.length)];
            pwActive.push(`${randomItem}`);
        }

        // checks if user chose to include special characters. if true, adds special characters to the bank of possible characters
        // if true, adds a single random element from the special characters array to active password, to ensure that every desired character type has at least one representative in final password
        if (useSpec === true) {
            pwBank = pwBank.concat(specChars);
            let randomItem = specChars[Math.floor(Math.random() * specChars.length)];
            pwActive.push(`${randomItem}`);
        }

        // checks that at least one possible character type has been chosen by user
        // if user does not choose any types, alerts user and returns null to force user to make new choices
        if (useLower === false && useUpper === false && useNumbers === false && useSpec === false) {
            alert("Your password must contain at least one optional character type, please try again.");
            return null;
        } else {
            // creates variable to accommodate the difference between user-chosen password length and the current length of the active password array
            // at this point, active password has one random element from each chosen character type to ensure every type is represented
            // for example, this means if user chooses password length of 12, and chooses 2 character types to include, the active password has 2 elements already in its array and will require 10 more to complete the password
            let initialPassLength = pwLength - pwActive.length;
            // loop to add random elements from the bank of possible characters into the active password one by one until the active password is the same length as that input by the user
            for (let i = 0; i < initialPassLength; i++) {
                let randomItem = pwBank[Math.floor(Math.random() * pwBank.length)];
                pwActive.push(`${randomItem}`);
            }
        }
    }

    // shuffles the array. before this, the active password will always begin with a represntative of each character type chosen to be included
    shuffleArray(pwActive);
    // returns the finished password as a string with no spaces or delimiters
    return pwActive.join("");
}

// Fisher-Yates technique for shuffling the contents of an array
function shuffleArray(array) {
    // loop begins at the end of inputted array, which is a varaible length, decrementing i until it reaches index 0
    // swaps an index in the array with another index that is closer to the beginning of the array (index 0)
    for (let i = array.length - 1; i > 0; i--) {
        // assigns variable to hold a randomly chosen index value, that will always be between 0 and the current value of i
        let randomIndex = Math.floor(Math.random() * (i + 1));

        // swap the values of array[i] and array[randomIndex]
        // assigns a substitute variable to hold the value of array[i] so that no data is lost when changing the value of array[i]
        let substituteIndex = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = substituteIndex;
    }
}

// Write password to the #password input, so it will display in the text area
function writePassword() {
    // defines the password as the returned value of generatePassword function
    let password = generatePassword();
    // assigns the text area with ID = password to a variable, allowing recurring text changes
    let passwordText = document.querySelector("#password");
    // changes the text in the password text box to reflect all of the changes made through the generatePassword function
    passwordText.value = password;
}

// Add event listener to generate button to activate when pushed
// begins the generator
generateBtn.addEventListener("click", writePassword);
