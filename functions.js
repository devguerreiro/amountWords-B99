const fs = require("fs");
const { parseSync } = require("subtitle");
const path = require("path");

const subtitlesDir = "./projeto1/legendas";

function getPhrases() {
  const files = fs.readdirSync(subtitlesDir);
  const srtFiles = filterFilesOfType(".srt", files);
  const firstFile = srtFiles[0];
  const filePath = path.join(subtitlesDir, firstFile);
  const fileRead = fs.readFileSync(filePath, "utf-8");

  return new Promise((resolve) => {
    resolve(parseSync(fileRead).map((cue) => cue.data.text));
  });
}

function filterFilesOfType(type, files) {
  return files.filter((file) => path.extname(file) === type);
}

function changeSpacesToSemicolon(array) {
  return array.map((string) => string.trim().replace(/\s/g, ";"));
}

function removeChar(char, array) {
  return array.map((string) => string.replace(char, ""));
}

function removeEmptyValuesFromArray(array) {
  return array.filter((value) => value.trim());
}

function allWordsToLowerCase(array) {
  return array.map((value) => value.toLowerCase());
}

function splitBySemicolon(array) {
  return [].concat(...array.map((phrase) => phrase.split(";")));
}

function amountWords(previous, current, result) {
  if (previous === current) {
    let qt = result[previous];

    if (qt) {
      result[previous] = ++qt;
    } else {
      result[previous] = 1;
    }
  }

  return current;
}

function wordsByPopularity(array) {
  const result = {};

  array.sort().reduce((previous, current) => {
    return amountWords(previous, current, result);
  });

  return Object.entries(result)
    .map(([word, qt]) => new Object({ word, qt }))
    .sort((a, b) => b.qt - a.qt);
}

module.exports = {
  getPhrases,
  changeSpacesToSemicolon,
  removeChar,
  removeEmptyValuesFromArray,
  allWordsToLowerCase,
  splitBySemicolon,
  wordsByPopularity,
};
