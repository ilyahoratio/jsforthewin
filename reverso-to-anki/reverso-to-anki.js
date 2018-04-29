



var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var readline = require('readline');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function scrapeReverso(userInputNotDecoded, howManyTimes, saveOrNot) {

// I need that for the regex brackets around French entry. French accents are tricky and are not registered by request/cheerio
var userInputForBrackets = userInputNotDecoded;

  for (j = 0; j < userInputNotDecoded.length; j++) {

    if (userInputNotDecoded[j] === 'œ') {
      var userInputNotDecoded = userInputNotDecoded.replace(/œ/g, '%c5%93');
    }

    if (userInputNotDecoded[j] === 'Œ') {
      var userInputNotDecoded = userInputNotDecoded.replace(/Œ/g, '%c5%92');
    }

    if (userInputNotDecoded[j] === 'Î') {
      var userInputNotDecoded = userInputNotDecoded.replace(/Î/g, '%c3%8e');
    }

    if (userInputNotDecoded[j] === 'î') {
      var userInputNotDecoded = userInputNotDecoded.replace(/î/g, '%c3%ae');
    }

    if (userInputNotDecoded[j] === 'É') {
      var userInputNotDecoded = userInputNotDecoded.replace(/É/g, '%c3%89');
    }

    if (userInputNotDecoded[j] === 'é') {
      var userInputNotDecoded = userInputNotDecoded.replace(/é/g, '%c3%a9');
    }

    if (userInputNotDecoded[j] === 'È') {
      var userInputNotDecoded = userInputNotDecoded.replace(/È/g, '%c3%88');
    }

    if (userInputNotDecoded[j] === 'è') {
      var userInputNotDecoded = userInputNotDecoded.replace(/è/g, '%c3%a8');
    }

    if (userInputNotDecoded[j] === 'Ê') {
      var userInputNotDecoded = userInputNotDecoded.replace(/Ê/g, '%c3%8a');
    }

    if (userInputNotDecoded[j] === 'ê') {
      var userInputNotDecoded = userInputNotDecoded.replace(/ê/g, '%c3%aa');
    }

    if (userInputNotDecoded[j] === 'Û') {
      var userInputNotDecoded = userInputNotDecoded.replace(/Û/g, '%c3%9b');
    }

    if (userInputNotDecoded[j] === 'û') {
      var userInputNotDecoded = userInputNotDecoded.replace(/û/g, '%c3%bb');
    }

    if (userInputNotDecoded[j] === 'Â') {
      var userInputNotDecoded = userInputNotDecoded.replace(/Â/g, '%c3%82');
    }

    if (userInputNotDecoded[j] === 'â') {
      var userInputNotDecoded = userInputNotDecoded.replace(/â/g, '%c3%a2');
    }

    if (userInputNotDecoded[j] === 'Ô') {
      var userInputNotDecoded = userInputNotDecoded.replace(/Ô/g, '%c3%94');
    }

    if (userInputNotDecoded[j] === 'ô') {
      var userInputNotDecoded = userInputNotDecoded.replace(/ô/g, '%c3%b4');
    }

    if (userInputNotDecoded[j] === 'Ç') {
      var userInputNotDecoded = userInputNotDecoded.replace(/Ç/g, '%c3%87');
    }

    if (userInputNotDecoded[j] === 'ç') {
      var userInputNotDecoded = userInputNotDecoded.replace(/ç/g, '%c3%a7');
    }

    if (userInputNotDecoded[j] === 'À') {
      var userInputNotDecoded = userInputNotDecoded.replace(/À/g, '%c3%80');
    }

    if (userInputNotDecoded[j] === 'à') {
      var userInputNotDecoded = userInputNotDecoded.replace(/à/g, '%c3%a0');
    }

  }
  
  
  var userInput = userInputNotDecoded;
  
  //since one iteration is skipped....


  request(('http://context.reverso.net/translation/french-english/' + userInput), function (error, response, body) {
    if (error) {
      console.log("Error: " + error);
    }
    console.log("Status code: " + response.statusCode + ". Success!");
    console.log('Your input is: ' + userInputForBrackets);
    console.log('--------------')
    console.log('');

    var $ = cheerio.load(body);

    $('section#examples-content').each(function (index) {

      var regexFr = new RegExp(userInputForBrackets, 'gi');
      var substFr = "[$&]";

      var regexBrackets = /(<em>)(.*)(<\/em>)/gi;
      var substBrackets = '[$2]';

      var regexRemoveSpan = /(<.*><\/.*>\s*<.*>\s*)(.*)(<\/span>)/gi;
      var substRemoveSpan = '$2';

      var regexRemoveLinkStart = /<a.*">/gi;
      var substRemoveLinkStart = '';
      
      var regexRemoveLinkEnd = /<\/a>/gi;
      var substRemoveLinkEnd = '';

      var regexRemoveQuotes = /&quot;/gi;
      var substRemoveQuotes = '"';

      var regexRemoveApost = /&apos;/gi;
      var substRemoveApost = "'";




      for (var i = 1; i <= howManyTimes; i++) {
        if (i === 6) continue;
        var exampleFrWeb = $(this).find(`.example:nth-child(${i}) div.src.ltr`).text().trim();
        var exampleEnWeb = $(this).find(`.example:nth-child(${i}) div.trg.ltr`).html().trim();

        var exampleEnWebBrackets = exampleEnWeb.replace(regexBrackets, substBrackets);

        var exampleEnRemoveSpan = exampleEnWebBrackets.replace(regexRemoveSpan, substRemoveSpan);

        var exampleEnRemoveLinkStart = exampleEnRemoveSpan.replace(regexRemoveLinkStart, substRemoveLinkStart);


        var exampleEnRemoveLinkEnd = exampleEnRemoveLinkStart.replace(regexRemoveLinkEnd, substRemoveLinkEnd);

        var exampleEnRemoveQuotes = exampleEnRemoveLinkEnd.replace(regexRemoveQuotes, substRemoveQuotes);

        var exampleEn = exampleEnRemoveQuotes.replace(regexRemoveApost, substRemoveApost);



        var exampleFr = exampleFrWeb.replace(regexFr, substFr);

        console.log(`${exampleFr}

${exampleEn}

------------
`);
if (saveOrNot === 'yes') {
  if (i === 1) {
    fs.appendFileSync('addIntoAnki.txt', `
  ${userInput} | ${exampleFr}<br>${exampleEn}<br><br>`);
  }
  if (i !== 1 && i !== howManyTimes) {
    fs.appendFileSync('addIntoAnki.txt', `${exampleFr}<br>${exampleEn}<br><br>`);
  }
  if (i === howManyTimes) {
    fs.appendFileSync('addIntoAnki.txt', exampleFr +'<br>' + exampleEn +'<br><br>')
  }
}

}

      });
    });
}



rl.question('Enter your construction/phrase: ', userInput=>{
  rl.question('How many entries (max input 14; 13 will be added) from Reverso would you like to have? ', howManyTimes=>{
    rl.question('Do you want to save the results in a .txt file? (yes/no) ', saveOrNot=>{
      scrapeReverso(userInput, howManyTimes, saveOrNot);
      rl.close();
    });
  });
});
