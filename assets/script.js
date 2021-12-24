let generateBtn = document.querySelector("#generate");

// 1b. create array of letters
let lcLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let ucLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let pwNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let specChars = ["!", "#", "$", "%", "&", "*", "+", "-", "<", "=", ">", "?", "@", "^", "_", "~"];

// generatePassword
// return a final password as a string
function generatePassword() {
    // 1. assign a variable to the length of the password
    let pwBank = [];
    let pwActive = [];
    let pwLength = prompt("Passwords should be between 8 and 128 chracters long. How long of a password would you like?");

    if (pwLength < 8 || pwLength > 128) {
        alert("Please choose a password length between 8 and 128 characters");
        return null;
    } else {
        let useLower = confirm("Do you want lowercase letters to be used?");
        let useUpper = confirm("Do you want upper case letters to be used?");
        let useNumbers = confirm("Do you want numbers to be used?");
        let useSpec = confirm("Do you want special characters to be used?");

        // 1c. loop through array of letters
        if (useLower === true) {
            pwBank = pwBank.concat(lcLetters);
            let randomItem = lcLetters[Math.floor(Math.random() * lcLetters.length)];
            pwActive.push(`${randomItem}`);
        }

        if (useUpper === true) {
            pwBank = pwBank.concat(ucLetters);
            let randomItem = ucLetters[Math.floor(Math.random() * ucLetters.length)];
            pwActive.push(`${randomItem}`);
        }

        if (useNumbers === true) {
            pwBank = pwBank.concat(pwNumbers);
            let randomItem = pwNumbers[Math.floor(Math.random() * pwNumbers.length)];
            pwActive.push(`${randomItem}`);
        }

        if (useSpec === true) {
            pwBank = pwBank.concat(specChars);
            let randomItem = specChars[Math.floor(Math.random() * specChars.length)];
            pwActive.push(`${randomItem}`);
        }

        if (useLower === false && useUpper === false && useNumbers === false && useSpec === false) {
            alert("Your password must contain at least one optional character type, please try again.");
            return null;
        } else {
            // grab one random letter from each array
            let initialPassLength = pwLength - pwActive.length;
            for (let i = 0; i < initialPassLength; i++) {
                let randomItem = pwBank[Math.floor(Math.random() * pwBank.length)];
                pwActive.push(`${randomItem}`);
            }
        }
    }

    // 1d. push each letter array into password array
    // 1e. create a random 10 letter password
    // 1e. convert password array back to string
    shuffleArray(pwActive);
    return pwActive.join("");
}

// Fisher-Yates technique for shuffling the contents of an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

        // swap elements array[i] and array[randomIndex]
        let substituteIndex = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = substituteIndex;
    }
}

// Write password to the #password input
function writePassword() {
    let password = generatePassword();
    let passwordText = document.querySelector("#password");
    passwordText.value = password;
}

// Add event listener to generate button
// begins the generator
generateBtn.addEventListener("click", writePassword);
