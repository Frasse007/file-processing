const fs = require('fs');

function countWords(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const trimmed = content.trim();
    if (trimmed === '') return 0;
    const words = trimmed.split(/\s+/);
    return words.length;
}

function findLongestWord(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const words = content.match(/\b[a-zA-Z]+\b/g);
    
    if (!words || words.length === 0) {
        return [];
    }
    let longestWords = new Set();
    let maxLength = 0;
    
    for (const word of words) {
         if (word.length > maxLength) {
            maxLength = word.length;
            longestWords = new Set([word]);
        } else if (word.length === maxLength) {
            longestWords.add(word);
        }
    }
    return Array.from(longestWords)
}

function countLines(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n');
    return lines.length
}

module.exports = {
    countWords,
    findLongestWord,
    countLines
};

//console.log('Number of words:', countWords('./data/quotes.txt'))
//console.log('Number of words:', countWords('./data/sample-text.txt'))

//console.log('Longest word(s):', findLongestWord('./data/quotes.txt'))
//console.log('Longest word(s):', findLongestWord('./data/sample-text.txt'))

//console.log('Number of lines:', countLines('./data/quotes.txt'))
//console.log('Number of lines:', countLines('./data/sample-text.txt'))