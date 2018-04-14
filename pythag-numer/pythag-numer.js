var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var pythag = {
  'a': 1,
  'j': 1,
  's': 1,
  'b': 2,
  'k': 2,
  't': 2,
  'c': 3,
  'l': 3,
  'u': 3,
  'd': 4,
  'm': 4,
  'v': 4,
  'e': 5,
  'n': 5,
  'w': 5,
  'f': 6,
  'o': 6,
  'x': 6,
  'g': 7,
  'p': 7,
  'y': 7,
  'h': 8,
  'q': 8,
  'z': 8,
  'i': 9,
  'r': 9
}
console.log('');
rl.question(`Enter what you would like to run through the Pythagorean numerology calculator:
` , (userInput) => {

    var joinedUserInput = userInput.toLowerCase().split(' ').join('');
    var splitUserInput = joinedUserInput.split('');
    var numericOutput = 0;
    var i = 0
    var letToNumCalc = '';

    while (i < joinedUserInput.length) {
      var letterIndex = splitUserInput[i];
      numericOutput += pythag[letterIndex];
      letToNumCalc += `${splitUserInput[i].toUpperCase()}=${pythag[letterIndex]} `;
      i++;
    }
    console.log('');
    console.log('---------------------------------');
    console.log("Pythagorean Numerology Calculator");
    console.log('---------------------------------');
    console.log('');
    console.log(userInput);
    console.log("=")
    console.log(numericOutput);
    console.log('');
    console.log(letToNumCalc);
    console.log('');
    rl.close();
  })