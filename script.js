let generateBtn = document.querySelector("#generate");

// 1b. create array of letters
let lcLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
let ucLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
let pwNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let specChars = [
  "!",
  "#",
  "$",
  "%",
  "&",
  "*",
  "+",
  "-",
  "<",
  "=",
  ">",
  "?",
  "@",
  "^",
  "_",
  "~",
];

// generatePassword
// return a final password as a string
function generatePassword() {
  // 1. assign a variable to the length of the password
  let pwLength = prompt(
    "Passwords should be between 8 and 128 chracters long. How long of a password would you like?"
  );

  if (pwLength < 8 || pwLength > 128) {
    alert("Please choose a password length between 8 and 128 characters");
    generatePassword();
  }

  let useLower = confirm("Do you want lowercase letters to be used?");
  let useUpper = confirm("Do you want upper case letters to be used?");
  let useNumbers = confirm("Do you want numbers to be used?");
  let useSpec = confirm("Do you want special characters to be used?");

  let password = [];

  // 1c. loop through array of letters
  if (useLower === true) {
    for (let i = 0; i < pwLength; i++) {
      password.push(lcLetters[i]);
    }
  }

  // 1d. push each letter array into password array
  // 1e. create a random 10 letter password

  // 1e. convert password array back to string
  return password.join("");
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
// kicks off the generator
generateBtn.addEventListener("click", writePassword);
