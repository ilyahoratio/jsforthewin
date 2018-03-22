var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Set the password length: ", function (passwordLength) {
  console.log("The password length will be:", passwordLength);
  console.log("Wait for it...");
  console.log("----------");

  rl.close();

  var passwordChars = `AaBbCcDdEeFfGgHhIiKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789()\`~!@#$%^&*-+=|{}[]:;"'<>,.?/`;
  var password = '';


  while (password.length < passwordLength) {
    var passwordCharsIndex = Math.floor(Math.random() * (passwordChars.length));
    password += passwordChars[passwordCharsIndex];
  }
  console.log(`Here's your randomly ${passwordLength} symbols generated password: ${password}`);
});