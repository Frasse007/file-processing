const fs = require('fs');

function sumNumbers(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    let sum = 0
    for (const line of lines) {
        const num = parseFloat(line.trim());
        if (!isNaN(num)) {
            sum += num
        }
    }
    return sum
}

function findHighLow(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n');
    
    let High = -Infinity
    let Low = Infinity
    for (const line of lines) {
        const num = parseFloat(line.trim());
        if (!isNaN(num)) {
            if (num > High) {
                High = num;
            } 
            if (num < Low) {
                Low = num;
            }
        }
    }
    return { High, Low };
}

function findAverage(filePath) {
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n');

    let sum = 0
    let count = 0
    for (const line of lines) {
        const num = parseFloat(line.trim());
        if (!isNaN(num)) {
            sum += num
            count++;
        }
    }
    return count > 0 ? sum / count : 0
}

module.exports = {
    sumNumbers,
    findHighLow,
    findAverage
};

//console.log('Sum:', sumNumbers('./data/sample-numbers.txt'))
//console.log('Highest & Lowest:', findHighLow('./data/sample-numbers.txt'))
//console.log('Average:', findAverage('./data/sample-numbers.txt'))