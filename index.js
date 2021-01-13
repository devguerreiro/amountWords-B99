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
  .then(removeCharFromWords(/[^a-zA-Z;]/g))
  .then(removeCharFromWords(/<i>|<\/i>/g))
  .then(removeCharFromWords(/^<font.*/g))
  .then(splitBySemicolon)
  .then(allWordsToLowerCase)
  .then(removeEmptyValuesFromArray)
  .then(wordsByPopularity)
  .then(saveResultToJSON);
