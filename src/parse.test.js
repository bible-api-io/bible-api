const parse = require('./parse').default

describe('parse(ParseOptions)', () => {
  describe('should return an empty array when passed:', () => {
    test('{ text: "Hello world!" }', () => {
      expect(parse({ text: 'Hello world!' })).toEqual([])
    })

    test('{ text: "Genesis 1:1 TR" }', () => {
      expect(parse({ text: 'Genesis 1:1 TR' })).toEqual([])
    })
  })

  describe('should return an array with one object with the correct values when passed:', () => {
    test('{ text: "Ephesians 1:4" }', () => {
      expect(parse({ text: 'Ephesians 1:4' })).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Ephesians',
            start: { chapterNumber: 1, verseNumber: 4 },
            end: { chapterNumber: 1, verseNumber: 4 }
          }
        }
      ])
    })

    test('{ text: "Ephesians 1:4-7" }', () => {
      expect(parse({ text: 'Ephesians 1:4-7' })).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Ephesians',
            start: { chapterNumber: 1, verseNumber: 4 },
            end: { chapterNumber: 1, verseNumber: 7 }
          }
        }
      ])
    })

    test('{ text: "Romans 5:20-" }', () => {
      expect(parse({ text: 'Romans 5:20-' })).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Romans',
            start: { chapterNumber: 5, verseNumber: 20 },
            end: { chapterNumber: 5, verseNumber: Infinity }
          }
        }
      ])
    })

    test('{ text: "Romans 5:20-6:2" }', () => {
      expect(parse({ text: 'Romans 5:20-6:2' })).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Romans',
            start: { chapterNumber: 5, verseNumber: 20 },
            end: { chapterNumber: 6, verseNumber: 2 }
          }
        }
      ])
    })

    test('{ text: "Romans 9" }', () => {
      expect(parse({ text: 'Romans 9' })).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Romans',
            start: { chapterNumber: 9, verseNumber: 1 },
            end: { chapterNumber: 9, verseNumber: Infinity }
          }
        }
      ])
    })

    test('{ text: "Genesis 1-2" }', () => {
      expect(parse({ text: 'Genesis 1-2' })).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 2, verseNumber: Infinity }
          }
        }
      ])
    })

    test('{ text: "Genesis 1-2:3" }', () => {
      expect(parse({ text: 'Genesis 1-2:3' })).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 2, verseNumber: 3 }
          }
        }
      ])
    })

    test('{ text: "Ephesians 1:4 (TR)" }', () => {
      expect(parse({ text: 'Ephesians 1:4 TR' })).toMatchObject([
        {
          version: 'TR1894',
          getPassageOptions: {
            bookId: 'Ephesians',
            start: { chapterNumber: 1, verseNumber: 4 },
            end: { chapterNumber: 1, verseNumber: 4 }
          }
        }
      ])
    })

    test('{ text: "Ephesians 1:4", defaultVersion: "TR1894" }', () => {
      expect(
        parse({ text: 'Ephesians 1:4', defaultVersion: 'TR1894' })
      ).toMatchObject([
        {
          version: 'TR1894',
          getPassageOptions: {
            bookId: 'Ephesians',
            start: { chapterNumber: 1, verseNumber: 4 },
            end: { chapterNumber: 1, verseNumber: 4 }
          }
        }
      ])
    })

    test('{ text: "Ephesians 1:4 (KJV)", defaultVersion: "TR1894" }', () => {
      expect(
        parse({ text: 'Ephesians 1:4 (KJV)', defaultVersion: 'TR1894' })
      ).toMatchObject([
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Ephesians',
            start: { chapterNumber: 1, verseNumber: 4 },
            end: { chapterNumber: 1, verseNumber: 4 }
          }
        }
      ])
    })
  })

  describe('should return an array with two objects in the correct order with the correct values when passed:', () => {
    test('{ text: "Revelation 1 (TR); Acts 1" }', () => {
      expect(parse({ text: 'Revelation 1 (TR); Acts 1' })).toMatchObject([
        {
          version: 'TR1894',
          getPassageOptions: {
            bookId: 'Revelation',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 1, verseNumber: Infinity }
          }
        },
        {
          version: 'KJV1769',
          getPassageOptions: {
            bookId: 'Acts',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 1, verseNumber: Infinity }
          }
        }
      ])
    })
  })
})
