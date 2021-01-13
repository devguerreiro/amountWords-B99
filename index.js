const {
  getPhrases,
  changeSpacesToSemicolon,
  removeChar,
  removeEmptyValuesFromArray,
  allWordsToLowerCase,
  splitBySemicolon,
  wordsByPopularity,
} = require("./functions");

getPhrases()
  .then(changeSpacesToSemicolon)
  .then((phrases) => removeChar(/-/g, phrases))
  .then((phrases) => removeChar(/,/g, phrases))
  .then((phrases) => removeChar(/'+/g, phrases))
  .then((phrases) => removeChar(/\?/g, phrases))
  .then((phrases) => removeChar(/\./g, phrases))
  .then((phrases) => removeChar(/_/g, phrases))
  .then((phrases) => removeChar(/"+/g, phrases))
  .then((phrases) => removeChar(/\%/g, phrases))
  .then((phrases) => removeChar(/♪/g, phrases))
  .then((phrases) => removeChar(/[0-9]*/g, phrases))
  .then((phrases) => removeChar(/\[|\]/g, phrases))
  .then((phrases) => removeChar(/<i>|<\/i>/g, phrases))
  .then((phrases) => removeChar(/^<font.*/g, phrases))
  .then(splitBySemicolon)
  .then(allWordsToLowerCase)
  .then(removeEmptyValuesFromArray)
  .then(wordsByPopularity)
  .then(console.log);
