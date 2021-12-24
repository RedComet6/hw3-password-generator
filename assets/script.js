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
        generatePassword();
    } else {
        let useLower = confirm("Do you want lowercase letters to be used?");
        let useUpper = confirm("Do you want upper case letters to be used?");
        let useNumbers = confirm("Do you want numbers to be used?");
        let useSpec = confirm("Do you want special characters to be used?");

        // 1c. loop through array of letters
        if (useLower === true) {
            pwBank = pwBank.concat(lcLetters);
        }

        if (useUpper === true) {
            pwBank = pwBank.concat(ucLetters);
        }

        if (useNumbers === true) {
            pwBank = pwBank.concat(pwNumbers);
        }

        if (useSpec === true) {
            pwBank = pwBank.concat(specChars);
        }

        if (useLower === false && useUpper === false && useNumbers === false && useSpec === false) {
            alert("Your password must contain at least one optional character type, please try again.");
            generatePassword();
        } else {
            for (let i = 0; i < pwLength; i++) {
                let randomItem = pwBank[Math.floor(Math.random() * pwBank.length)];
                pwActive = pwActive.concat(`${randomItem}`);
            }
        }
    }

    // 1d. push each letter array into password array
    // 1e. create a random 10 letter password
    // 1e. convert password array back to string
    return pwActive.join("");
}

// Write password to the #password input
function writePassword() {
    let password = generatePassword();
    let passwordText = document.querySelector("#password");
    passwordText.value = password;
}

// Add event listener to generate button
// kicks off the generator
generateBtn.addEventListener("click", writePassword);
