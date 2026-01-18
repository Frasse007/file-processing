const fs = require ('fs');
const { sumNumbers, findAverage, findHighLow} = require('../src/numberProcessor.js')

beforeAll(() => {
    if(!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
});

afterAll(() => {
    const testFiles = fs.readdirSync('./data').filter(f => f.startsWith('test-'));
    testFiles.forEach(file => fs.unlinkSync(`./data/${file}`));
});

describe('Should sum numbers', () => {
    test('Sums positive numbers', () => {
        fs.writeFileSync('./data/test-sum-positive.txt', '5\n10\n15');
        const result = sumNumbers('./data/test-sum-positive.txt');
        expect(result).toBe(30);
    });

    test('Sums negative numbers', () => {
        fs.writeFileSync('./data/test-sum-negative.txt', '-5\n-10\n-15');
        const result = sumNumbers('./data/test-sum-negative.txt');
        expect(result).toBe(-30);
    });

    test('Sums positive & negative numbers', () => {
        fs.writeFileSync('./data/test-sum-mixed.txt', '-5\n10\n-15');
        const result = sumNumbers('./data/test-sum-mixed.txt');
        expect(result).toBe(-10);
    });
    
    test('Sums decimal numbers', () => {
        fs.writeFileSync('./data/test-sum-decimal.txt', '1.5\n5.5\n12.5');
        const result = sumNumbers('./data/test-sum-decimal.txt');
        expect(result).toBe(19.5);
    });

    test('Handles single number', () => {
        fs.writeFileSync('./data/test-sum-single.txt', '8');
        const result = sumNumbers('./data/test-sum-single.txt');
        expect(result).toBe(8);
    });

    test('Handles empty lines between number', () => {
        fs.writeFileSync('./data/test-sum-empty.txt', '5\n\n10\n\n15');
        const result = sumNumbers('./data/test-sum-empty.txt');
        expect(result).toBe(30);
    });
})

describe('Should find high and low', () => {
    test('Finds high and low in negative numbers', () => {
        fs.writeFileSync('./data/test-high-low-negative.txt', '-5\n-10\n-15');
        const result = findHighLow('./data/test-high-low-negative.txt');
        expect(result).toEqual({High: -5, Low: -15});
    });

    test('Finds high and low in positive numbers', () => {
        fs.writeFileSync('./data/test-high-low-positive.txt', '5\n10\n15');
        const result = findHighLow('./data/test-high-low-positive.txt');
        expect(result).toEqual({High: 15, Low: 5});
    });

    test('Finds high and low in mixed numbers', () => {
        fs.writeFileSync('./data/test-high-low-mixed.txt', '-5\n10\n-15');
        const result = findHighLow('./data/test-high-low-mixed.txt');
        expect(result).toEqual({High: 10, Low: -15});
    });
    
    test('Handles single number', () => {
        fs.writeFileSync('./data/test-high-low-single.txt', '11');
        const result = findHighLow('./data/test-high-low-single.txt');
        expect(result).toEqual({High: 11, Low: 11});
    });

    test('Handles decimal numbers', () => {
        fs.writeFileSync('./data/test-high-low-decimal.txt', '1.2\n3.7\n8.4');
        const result = findHighLow('./data/test-high-low-decimal.txt');
        expect(result).toEqual({High: 8.4, Low: 1.2});
    });

    test('Handles empty lines between numbers', () => {
        fs.writeFileSync('./data/test-high-low-empty.txt', '5\n\n10\n\n15');
        const result = findHighLow('./data/test-high-low-empty.txt');
        expect(result).toEqual({High: 15, Low: 5});
    });
})

describe('Should find average of numbers', () => {
    test('Finds average of positive numbers', () => {
        fs.writeFileSync('./data/test-average-positive.txt', '5\n10\n15');
        const result = findAverage('./data/test-average-positive.txt');
        expect(result).toBe(10);
    });

    test('Finds average of negative numbers', () => {
        fs.writeFileSync('./data/test-average-negative.txt', '-5\n-10\n-15');
        const result = findAverage('./data/test-average-negative.txt');
        expect(result).toBe(-10);
    });

    test('Finds average of mixed numbers', () => {
        fs.writeFileSync('./data/test-average-mixed.txt', '-5\n10\n25');
        const result = findAverage('./data/test-average-mixed.txt');
        expect(result).toBe(10);
    });
    
    test('Finds average of decimal numbers', () => {
        fs.writeFileSync('./data/test-average-decimal.txt', '1.7\n6.8\n12.5');
        const result = findAverage('./data/test-average-decimal.txt');
        expect(result).toBe(7);
    });

    test('Handles single number', () => {
        fs.writeFileSync('./data/test-average-single.txt', '17');
        const result = findAverage('./data/test-average-single.txt');
        expect(result).toBe(17);
    });

    test('Handles empty lines between numbers', () => {
        fs.writeFileSync('./data/test-average-empty.txt', '5\n\n10\n\n15');
        const result = findAverage('./data/test-average-empty.txt');
        expect(result).toBe(10);
    });
})