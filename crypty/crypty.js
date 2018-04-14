var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var crypto = require('crypto');
var cryptAlgo = 'aes-256-ctr';


var passwordChars = "AaBbCcDdEeFf0123456789"
var password32 = '';
var iv16 = '';




console.log('');
console.log(`Would you like to encrypt a message or decrypt a message?
1 Encrypt
2 Decrypt
`)
rl.question(`Enter 1 or 2:
`, (encryptOrDecrypt) => {

    if (encryptOrDecrypt === '1') {

      console.log('');
      console.log('You are about to encrypt your message with aes-256-ctr encryption.');
      console.log('Please follow the instructions below closely');
      console.log('');


      rl.question(`Do you already have the password?
If "yes", you will need to enter it later. 
If "no", you will be provided with a new 32-bit hex password.

Enter yes or no:
`, (haveThePassword) => {
          if (haveThePassword.toLowerCase() === "yes") {
            rl.question(`
Enter the password you already have: 

`, (passwordAlreadyHave) => {

                while (iv16.length < 16) {
                  var passwordCharsIndex = Math.floor(Math.random() * (passwordChars.length));
                  iv16 += passwordChars[passwordCharsIndex];
                }
                console.log('');
                console.log('Although you already have the password, each time you encrypt a new message you will need a new IV.');
                console.log('');
                console.log('On top of the password, the person decrypting your message will need the IV you had been provided with when encrypting a new message.');
                console.log('');
                console.log("Here's your new 16 bit hex IV for your message:")
                console.log('');
                console.log('---------');
                console.log(iv16);
                console.log('---------');
                console.log('');
                rl.question(`Enter the message you would like to encrypt:
`, (messageText) => {

                    var myKey = crypto.createCipheriv(cryptAlgo, passwordAlreadyHave, iv16);
                    var encriptedMessage = myKey.update(messageText, 'utf8', 'hex');

                    console.log('');
                    console.log('This is how your message looks like when it\'s encrypted:')
                    console.log('');
                    console.log('---------------');
                    console.log(encriptedMessage);
                    console.log('---------------');
                    console.log('');
                    console.log('Send this encrypted message to the recipient.');
                    console.log('The recipent should already know the password.')
                    console.log('');
                    console.log('Provide him with the new iv you had been given earlier so that he can decrypt your message.')
                    console.log('');
                    console.log('Privacy is everything');
                    console.log('');

                    rl.close();
                  })
              })
          }


          if (haveThePassword.toLowerCase() === "no") {

            while (password32.length < 32) {
              var passwordCharsIndex = Math.floor(Math.random() * (passwordChars.length));
              password32 += passwordChars[passwordCharsIndex];
            }

            while (iv16.length < 16) {
              var passwordCharsIndex = Math.floor(Math.random() * (passwordChars.length));
              iv16 += passwordChars[passwordCharsIndex];
            }

            console.log('');
            console.log("Here's your fresh 32 bit hex password");
            console.log("Save it somewhere. The person decrypting your message will need it!");
            console.log('');
            console.log('---------------');
            console.log(password32);
            console.log('---------------');
            console.log('');
            console.log("Now that you have the password, you will answer 'yes' in the question above, when you decide to encrypt a message to the same recipient again.")
            console.log('')
            console.log('Each time you encrypt a new message you will need new IV.');
            console.log('');
            console.log('On top of the password, the person decrypting your message will need the IV you had been provided with when encrypting a new message.');
            console.log('');
            console.log("Here's your 16 bit hex IV for your message:")
            console.log('');
            console.log('---------');
            console.log(iv16);
            console.log('---------');
            console.log('');
            rl.question(`Enter the message you would like to encrypt:
`, (messageText) => {

                var myKey = crypto.createCipheriv(cryptAlgo, password32, iv16);
                var encriptedMessage = myKey.update(messageText, 'utf8', 'hex');

                console.log('');
                console.log('This is how your message looks like when it\'s encrypted:')
                console.log('');
                console.log('---------------');
                console.log(encriptedMessage);
                console.log('---------------');
                console.log('');
                console.log('Send this encrypted message to the recipient');
                console.log('Provide the recipient with the password and the iv you had been given earlier so that he can decrypt your message.')
                console.log('');
                console.log('Privacy is everything');
                console.log('');

                rl.close();
              })
          }

        });

    }


    if (encryptOrDecrypt === '2') {

      console.log('');
      console.log('You are about to decrypt a message with aes-256-ctr encryption.')
      console.log('Please follow the instructions below closely.');
      console.log('');
      console.log('Make sure the sender provided you with the password and IV!')
      console.log();
      rl.question(`Enter the password:
`, (cryptPassword) => {
          console.log('');
          rl.question(`Enter the IV:
`, (iv) => {
              console.log('');
              rl.question(`Enter the encrypted message:
`, (encryptedMessage) => {
                  var decryptMyKey = crypto.createDecipheriv(cryptAlgo, cryptPassword, iv);
                  var decryptEncryptedMessage = decryptMyKey.update(encryptedMessage, 'hex', 'utf8');
                  console.log('');
                  console.log('......');
                  console.log('...The message is being decrypted...');
                  console.log('......');
                  console.log('');
                  console.log('This is how your message looks like when it\'s encrypted:');
                  console.log('');
                  console.log('---------------');
                  console.log(decryptEncryptedMessage);
                  console.log('---------------');
                  console.log('');
                  console.log('You have sucessfully decrypted the encrypted message!')
                  console.log('');
                  console.log('Privacy is everything');
                  console.log('');
                  rl.close();
                });
            });
        });


    }

  });





/* 
var encryptedFile = 'encrypted-file.txt'
var fs = require('fs');

var criptPassword = 'mDrwb-@|exDYsq+';
var encriptedMessage = fs.readFileSync(encryptedFile, 'utf8');
var decryptMyKey = crypto.createDecipher(cryptAlgo, criptPassword);
var decryptEncriptedMessage = decryptMyKey.update(encriptedMessage, 'hex', 'utf8');

console.log(decryptEncriptedMessage);
fs.writeFile('decoded-file.txt', decryptEncriptedMessage, function (err) {
  if (err)
    return console.log(err);
  console.log('The text file has been encrypted. Check out the "decoded-file.txt"!');
}); */