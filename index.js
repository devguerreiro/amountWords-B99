const {
  concatAllSubtitles,
  changeSpacesToSemicolon,
  removeCharFromWords,
  removeEmptyValuesFromArray,
  allWordsToLowerCase,
  splitBySemicolon,
  wordsByPopularity,
  saveResultToJSON,
} = require("./functions");

concatAllSubtitles()
  .then(changeSpacesToSemicolon)
  .then((phrases) => removeCharFromWords(/[^a-zA-Z;]/g, phrases))
  .then((phrases) => removeCharFromWords(/<i>|<\/i>/g, phrases))
  .then((phrases) => removeCharFromWords(/^<font.*/g, phrases))
  .then(splitBySemicolon)
  .then(allWordsToLowerCase)
  .then(removeEmptyValuesFromArray)
  .then(wordsByPopularity)
  .then(saveResultToJSON);
