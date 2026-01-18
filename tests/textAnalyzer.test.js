const fs = require ('fs');
const { countWords, findLongestWord, countLines} = require('../src/textAnalyzer.js')

beforeAll(() => {
    if(!fs.existsSync('./data')) {
        fs.mkdirSync('./data');
    }
});

afterAll(() => {
    const testFiles = fs.readdirSync('./data').filter(f => f.startsWith('test-'));
    testFiles.forEach(file => fs.unlinkSync(`./data/${file}`));
});

describe('Should count words', () => {
    test('Counts words in simple text', () => {
        fs.writeFileSync('./data/test-words-simple.txt', 'Hello world test');
        const result = countWords('./data/test-words-simple.txt');
        expect(result).toBe(3);
    });

    test('Counts words with multiple spaces', () => {
        fs.writeFileSync('./data/test-words-spaces.txt', 'Hello   world   test');
        const result = countWords('./data/test-words-spaces.txt');
        expect(result).toBe(3);
    });

    test('Counts words on new lines', () => {
        fs.writeFileSync('./data/test-words-newlines.txt', 'Hello\nworld\ntest\nagain');
        const result = countWords('./data/test-words-newlines.txt');
        expect(result).toBe(4);
    });

    test('Handles single word', () => {
        fs.writeFileSync('./data/test-words-single.txt', 'Hello');
        const result = countWords('./data/test-words-single.txt');
        expect(result).toBe(1);
    });

    test('Handles empty file', () => {
        fs.writeFileSync('./data/test-words-empty.txt', '');
        const result = countWords('./data/test-words-empty.txt');
        expect(result).toBe(0);
    });

    test('Handles only whitespace', () => {
        fs.writeFileSync('./data/test-words-whitespace.txt', '  \n\n  ');
        const result = countWords('./data/test-words-whitespace.txt');
        expect(result).toBe(0);
    });
});

describe('Should find longest word', () => {
    test('Finds single longest word', () => {
        fs.writeFileSync('./data/test-longest-single.txt', 'apple banana pear grapefruit');
        const result = findLongestWord('./data/test-longest-single.txt');
        expect(result).toEqual(['grapefruit']);
    });

    test('Finds multiple longest words', () => {
        fs.writeFileSync('./data/test-longest-multiple.txt', 'apple banana pear orange');
        const result = findLongestWord('./data/test-longest-multiple.txt');
        expect(result.sort()).toEqual(['banana', 'orange'].sort());
    });

    test('Finds longest word with mixed case', () => {
        fs.writeFileSync('./data/test-longest-case.txt', 'APPLE banana PEAR grapefruit');
        const result = findLongestWord('./data/test-longest-case.txt');
        expect(result).toEqual(['grapefruit']);
    });

    test('Ignores non-alphabetic characters', () => {
        fs.writeFileSync('./data/test-longest-alphabetic.txt', 'apple12345 banana pear987654 grapefruit');
        const result = findLongestWord('./data/test-longest-alphabetic.txt');
        expect(result).toEqual(['grapefruit']);
    });

    test('Handles single word', () => {
        fs.writeFileSync('./data/test-longest-one.txt', 'apple');
        const result = findLongestWord('./data/test-longest-one.txt');
        expect(result).toEqual(['apple']);
    });

    test('Handles empty file', () => {
        fs.writeFileSync('./data/test-longest-empty.txt', '');
        const result = findLongestWord('./data/test-longest-empty.txt');
        expect(result).toEqual([]);
    });

    test('Handles file with no alphabetic words', () => {
        fs.writeFileSync('./data/test-longest-numbers.txt', '123 456 789 0');
        const result = findLongestWord('./data/test-longest-numbers.txt');
        expect(result).toEqual([]);
    });
    
    test('Handles duplicate longest word', () => {
        fs.writeFileSync('./data/test-longest-duplicate.txt', 'apple apple pear');
        const result = findLongestWord('./data/test-longest-duplicate.txt');
        expect(result).toEqual(['apple']);
    });
});

describe('Should count lines', () => {
    test('Counts multiple lines', () => {
        fs.writeFileSync('./data/test-lines-multiple.txt', 'Line 1\nLine 2\nLine3');
        const result = countLines('./data/test-lines-multiple.txt');
        expect(result).toBe(3);
    });

    test('Counts single lines', () => {
        fs.writeFileSync('./data/test-lines-single.txt', 'This is one line only');
        const result = countLines('./data/test-lines-single.txt');
        expect(result).toBe(1);
    });

    test('Counts empty lines', () => {
        fs.writeFileSync('./data/test-lines-empty.txt', 'Line 1\n\nLine3');
        const result = countLines('./data/test-lines-empty.txt');
        expect(result).toBe(3);
    });

    test('Handles empty file', () => {
        fs.writeFileSync('./data/test-lines-none.txt', '');
        const result = countLines('./data/test-lines-none.txt');
        expect(result).toBe(1);
    });

    test('Counts lines with a trailing new line', () => {
        fs.writeFileSync('./data/test-lines-trailing.txt', 'Line 1\nLine2\n');
        const result = countLines('./data/test-lines-trailing.txt');
        expect(result).toBe(3);
    });
});