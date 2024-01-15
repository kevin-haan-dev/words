const { JSDOM } = require("jsdom");

class Processor {
  /**
   * Processes the given data and returns a JSON string representing a word map.
   *
   * @param {Buffer} data - The data to be processed.
   * @return {string} The JSON string representing a word map.
   */
  processData(data) {
    const jsonString = data.content.toString();
    const articles = JSON.parse(jsonString);
    const wordMap = {};

    for (const article of articles) {
      const words = this.extractWords(article.content.rendered);
      wordMap[article.title.rendered] = this.countWords(words);
    }

    return JSON.stringify(wordMap);
  }

  extractWords(htmlContent) {
    const dom = new JSDOM(htmlContent);
    const text = dom.window.document.body.textContent;
    return text.trim().match(/\b\p{Letter}{2,}\b/giu) || [];
  }

  countWords(words) {
    const wordCounts = {};
    words.forEach((word) => {
      const lowerCaseWord = word.toLowerCase();
      if (!wordCounts[lowerCaseWord]) {
        wordCounts[lowerCaseWord] = { word: word, count: 0 };
      }
      wordCounts[lowerCaseWord].count += 1;
    });

    return Object.values(wordCounts).reduce((finalMap, { word, count }) => {
      finalMap[word] = count;
      return finalMap;
    }, {});
  }
}

module.exports = Processor;
