const { JSDOM } = require("jsdom");

// processes the post content by extracting the text within html-tags, passes them through a Regex and counts the words

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

/**
   * Extracts words from the given HTML content.
   * Uses the JSDOM library to parse the HTML content and extract the text
   * Passes them through a Regex and counts the words
   *
   * @param {string} htmlContent - HTML content to extract words from
   * @return {string[]} array of words extracted from the HTML content
   */
  extractWords(htmlContent) {
    const dom = new JSDOM(htmlContent);
    const text = dom.window.document.body.textContent;
    return text.trim().match(/\b\p{Letter}{2,}\b/giu) || [];
  }

  /**
   * Counts the occurrences of each word in a given array of words
   *
   * @param {Array} words - array of words to count
   * @return {Object} - object mapping each word to its count
   */
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
