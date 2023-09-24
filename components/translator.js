const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
let americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");
let locales = {
  "american-to-british": americanOnly,
  "british-to-american": britishOnly,
};
class Translator {
  translate(text, locale) {
    let localeObj = locales[locale];
    //Regex Patterns for matching time
    let regexAmerican = {
      regex: "(0?[0-9]|[0-2][0-3]):[0-5][0-9]",
      charFrom: ":",
      charTo: ".",
    };
    let regexBritish = {
      regex: "(0?[0-9]|[0-2][0-3]).[0-5][0-9]",
      charFrom: ".",
      charTo: ":",
    };

    let checkText = text; //Copy of initial text argument to check against modified text
    let translatedPhrases = []; //An array to store translated phrases

    //A function to reverse keys and values on a given object
    function reverseObj(obj) {
      let objValues = Object.values(obj);
      let objProperties = Object.keys(obj);
      let reversedObj = {};
      for (let i = 0; i < objValues.length; i++) {
        reversedObj[objValues[i]] = objProperties[i];
      }
      return reversedObj;
    }

    let britishToAmericanSpelling = reverseObj(americanToBritishSpelling);
    let britishToAmericanTitles = reverseObj(americanToBritishTitles);

    //Function to translated phrases in a string using keys and values from a provided object
    function translatePhrases(text, obj) {
      //Function to replace phrases in a string at the necessary index
      function replaceWord(text, wordIndex, regexWord, word) {
        let strOne = text.slice(0, wordIndex);
        let strTwo = text.slice(wordIndex);
        strTwo = strTwo.replace(regexWord, word);
        return strOne + strTwo;
      }
      let testText = text; //Copy of text that will be used to obtain index of words need to be replaced. Both valid and invald phrases will be replaced on testText to avoid invalid words in in the next iterations

      for (let word of Object.keys(obj)) {
        //Escaping Period (.) found in words
        let wordForRegExp = word;
        if (/\./.test(wordForRegExp)) {
          wordForRegExp = wordForRegExp.replace(/\./, "\\.");
        }

        //Convert first letter of Title words to uppercase
        if (obj == americanToBritishTitles || obj == britishToAmericanTitles) {
          obj[word] = obj[word].replace(
            obj[word][0],
            obj[word][0].toUpperCase()
          );
        }

        let regexPattern = new RegExp(wordForRegExp, "gi");
        let regexWord = new RegExp(wordForRegExp, "i");
        let matchList = text.match(regexPattern);

        if (matchList != null) {
          let strTextReplace = "*".repeat(word.length);
          let strTestReplace = "*".repeat(obj[word].length);

          let i = 0;
          let wordIndex = testText.search(regexWord);

          while (i < matchList.length) {
            //Check if the characters before and after the word found in the testText are not undefined
            if (
              testText[wordIndex - 1] != undefined &&
              testText[wordIndex + word.length] != undefined
            ) {
              //If the characters before and after the word found in the testText are equal to letters or numbers then the word will not be translated.
              if (
                /[a-zA-Z0-9]/.test(testText[wordIndex - 1]) == false &&
                /[a-zA-Z0-9]/.test(testText[wordIndex + word.length]) == false
              ) {
                text = replaceWord(text, wordIndex, regexWord, obj[word]);
                translatedPhrases.push(obj[word]);
                testText = testText.replace(regexWord, strTestReplace); //Word found in testText is replaced with * characters equivalent to length of the word
                wordIndex = testText.search(regexWord);
              }
            } else {
              if (
                testText[wordIndex - 1] == undefined &&
                testText[wordIndex + word.length] == undefined
              ) {
                text = replaceWord(text, wordIndex, regexWord, obj[word]);
                translatedPhrases.push(obj[word]);
              } else {
                //Check if characters before and after the word found in the testText are not letters or numbers
                if (
                  /[^a-zA-Z0-9]/.test(testText[wordIndex - 1]) ||
                  /[^a-zA-Z0-9]/.test(testText[wordIndex + word.length])
                ) {
                  text = replaceWord(text, wordIndex, regexWord, obj[word]);
                  translatedPhrases.push(obj[word]);
                  testText = testText.replace(regexWord, strTestReplace);
                  wordIndex = testText.search(regexWord);
                }
              }
            }
            i++;
          }
        }
      }
      return text;
    }

    //Function to translate time string found in the text
    function translateTime(text, regexPattern) {
      let testText = text;
      let matchObj = {
        matchList: text.match(new RegExp(regexPattern.regex, "g")),
        matchLength: [],
      };

      for (let item in matchObj.matchList) {
        matchObj.matchLength.push(matchObj.matchList[item].length);
      }

      if (matchObj.matchList != null) {
        let i = 0;
        while (i < matchObj.matchList.length) {
          let matchIndex = testText.search(new RegExp(regexPattern.regex, "g"));
          testText = testText.replace(
            new RegExp(regexPattern.regex),
            "*".repeat(matchObj.matchLength[i])
          );
          let charIndex = matchObj.matchList[i].indexOf(regexPattern.charFrom);
          let charLength = matchObj.matchList[i].length;

          text = text.split("");
          text[matchIndex + charIndex] = regexPattern.charTo;
          text = text.join("");
          translatedPhrases.push(text.substr(matchIndex, charLength));
          i++;
        }
      }
      return text;
    }

    //Implement functions with output of the previous function as argument
    let translationCommon = translatePhrases(text, localeObj);
    let translationSpelling, translationTitles, translation;

    if (locale == "american-to-british") {
      translationSpelling = translatePhrases(
        translationCommon,
        americanToBritishSpelling
      );

      translationTitles = translatePhrases(
        translationSpelling,
        americanToBritishTitles
      );

      translation = translateTime(translationTitles, regexAmerican);
    } else {
      translationSpelling = translatePhrases(
        translationCommon,
        britishToAmericanSpelling
      );

      translationTitles = translatePhrases(
        translationSpelling,
        britishToAmericanTitles
      );

      translation = translateTime(translationTitles, regexBritish);
    }

    if (translatedPhrases.length != 0) {
      //Check if the translated text starts not with a translated word and convert its starting letter to uppercase
      for (let el of translatedPhrases) {
        el = el.replace(/\./, "\\.");
        let searchIndex = translation.search(el);
        if (searchIndex != 0) {
          translation = translation.replace(
            translation.charAt(0),
            translation.charAt(0).toUpperCase()
          );
        }
      }
    }
    if (checkText == translation) {
      return { translation: "Everything looks good to me!" };
    } else {
      return { translation: translation, translatedPhrases: translatedPhrases };
    }
  }
}

module.exports = Translator;
