const fs = require("fs");
const { parseSync } = require("subtitle");
const path = require("path");

const subtitlesDir = path.join(__dirname, "legendas");

function readSubtitleFile(filename) {
  const filePath = path.join(subtitlesDir, filename);

  return fs.readFileSync(filePath, "utf-8");
}

function getTextFromSubtitle(cue) {
  return cue.data.text;
}

function filterFilesOfType(type, files) {
  return files.filter((file) => path.extname(file) === type);
}

function changeSpacesToSemicolon(words) {
  return words.map((word) => word.trim().replace(/\s/g, ";"));
}

function removeCharFromWords(char) {
  return function (words) {
    return words.map((word) => word.replace(char, ""));
  };
}

function removeEmptyValuesFromArray(array) {
  return array.filter((value) => value.trim());
}

function allWordsToLowerCase(words) {
  return words.map((word) => word.toLowerCase());
}

function splitBySemicolon(phrases) {
  return [].concat(...phrases.map((phrase) => phrase.split(";")));
}

function saveResultToJSON(result) {
  const filename = path.join(__dirname, "result.json");

  fs.writeFileSync(filename, JSON.stringify(result));
}

function sortByDec(a, b) {
  return b - a;
}

function concatAllSubtitles() {
  return new Promise((resolve) => {
    const files = fs.readdirSync(subtitlesDir);
    const srtFiles = filterFilesOfType(".srt", files);
    const allEpisodesSubtitles = srtFiles.map(readSubtitleFile);

    const result = [].concat(
      ...allEpisodesSubtitles.map((episodeSubtitles) =>
        parseSync(episodeSubtitles).map(getTextFromSubtitle)
      )
    );

    resolve(result);
  });
}

function calculateAmountWords(words) {
  const result = {};

  words.sort().reduce((previousWord, currentWord) => {
    const equals = previousWord === currentWord;

    if (equals) {
      const qtPrevious = result[previousWord];

      if (!qtPrevious) result[currentWord] = 2;
      else result[currentWord] = qtPrevious + 1;
    } else result[currentWord] = 1;

    return currentWord;
  });

  return result;
}

function wordsByPopularity(words) {
  const result = calculateAmountWords(words);

  return Object.entries(result)
    .map(([word, qt]) => new Object({ word, qt }))
    .sort((a, b) => sortByDec(a.qt, b.qt));
}

module.exports = {
  concatAllSubtitles,
  changeSpacesToSemicolon,
  removeCharFromWords,
  removeEmptyValuesFromArray,
  allWordsToLowerCase,
  splitBySemicolon,
  wordsByPopularity,
  saveResultToJSON,
};
