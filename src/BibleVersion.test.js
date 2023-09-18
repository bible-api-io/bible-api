const BibleVersion = require('./BibleVersion').default

const genesis1_1 = {
  bookId: 'Genesis',
  chapterNumber: 1,
  verseNumber: 1,
  name: 'Genesis 1:1 (KJV1769)',
  html: '<span class="bible__verse"><span class="bible__verse-number">1</span>In the beginning God created the heaven and the earth.</span>',
  markdown: 'In the beginning God created the heaven and the earth.',
  text: 'In the beginning God created the heaven and the earth.'
}

const genesis1_2 = {
  bookId: 'Genesis',
  chapterNumber: 1,
  verseNumber: 2,
  name: 'Genesis 1:2 (KJV1769)',
  html: '<span class="bible__verse"><span class="bible__verse-number">2</span>And the earth was without form, and void; and darkness <i>was</i> upon the face of the deep. And the Spirit of God moved upon the face of the waters.</span>',
  markdown:
    'And the earth was without form, and void; and darkness *was* upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
  text: 'And the earth was without form, and void; and darkness [was] upon the face of the deep. And the Spirit of God moved upon the face of the waters.'
}

const genesis1_3 = {
  bookId: 'Genesis',
  chapterNumber: 1,
  verseNumber: 3,
  name: 'Genesis 1:3 (KJV1769)',
  html: '<span class="bible__verse"><span class="bible__verse-number">3</span>And God said, Let there be light: and there was light.</span>',
  markdown: 'And God said, Let there be light: and there was light.',
  text: 'And God said, Let there be light: and there was light.'
}

const genesis1 = {
  bookId: 'Genesis',
  start: { chapterNumber: 1, verseNumber: 1 },
  end: { chapterNumber: 1, verseNumber: 3 },
  name: 'Genesis 1 (KJV1769)',
  verses: [genesis1_1, genesis1_2, genesis1_3]
}

const genesis2_1 = {
  bookId: 'Genesis',
  chapterNumber: 2,
  verseNumber: 1,
  name: 'Genesis 2:1 (KJV1769)',
  html: '<span class="bible__verse"><span class="bible__verse-number">1</span>Thus the heavens and the earth were finished, and all the host of them.</span>',
  markdown:
    'Thus the heavens and the earth were finished, and all the host of them.',
  text: 'Thus the heavens and the earth were finished, and all the host of them.'
}

const genesis2_2 = {
  bookId: 'Genesis',
  chapterNumber: 2,
  verseNumber: 2,
  name: 'Genesis 2:2 (KJV1769)',
  html: '<span class="bible__verse"><span class="bible__verse-number">2</span>And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.</span>',
  markdown:
    'And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.',
  text: 'And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.'
}

const genesis2_3 = {
  bookId: 'Genesis',
  chapterNumber: 2,
  verseNumber: 3,
  name: 'Genesis 2:3 (KJV1769)',
  html: '<span class="bible__verse"><span class="bible__verse-number">3</span>And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.</span>',
  markdown:
    'And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.',
  text: 'And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.'
}

const genesis2 = {
  bookId: 'Genesis',
  start: { chapterNumber: 2, verseNumber: 1 },
  end: { chapterNumber: 2, verseNumber: 3 },
  name: 'Genesis 2 (KJV1769)',
  verses: [genesis2_1, genesis2_2, genesis2_3]
}

const genesis1_1_2_3 = {
  bookId: 'Genesis',
  start: { chapterNumber: 1, verseNumber: 1 },
  end: { chapterNumber: 2, verseNumber: 3 },
  name: 'Genesis 1\u20132 (KJV1769)',
  verses: [
    genesis1_1,
    genesis1_2,
    genesis1_3,
    genesis2_1,
    genesis2_2,
    genesis2_3
  ]
}

const kjv1769Options = {
  longName: 'King James Version (1769)',
  shortName: 'KJV1769',
  synonyms: [],
  booksData: {
    Genesis: {
      name: 'Genesis',
      chaptersData: [
        null,
        [
          null,
          'In the beginning God created the heaven and the earth.',
          'And the earth was without form, and void; and darkness *was* upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
          'And God said, Let there be light: and there was light.'
        ],
        [
          null,
          'Thus the heavens and the earth were finished, and all the host of them.',
          'And on the seventh day God ended his work which he had made; and he rested on the seventh day from all his work which he had made.',
          'And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work which God created and made.'
        ]
      ]
    }
  }
}

const kjv1769 = new BibleVersion(kjv1769Options)

describe('new BibleVersion(BibleVersionOptions)', () => {
  test('should return an object with the correct values', () => {
    expect(kjv1769).toMatchObject(kjv1769Options)
  })

  describe('BibleVersion.getVerse(GetVerseOptions)', () => {
    it('should return the correct verse', () => {
      expect(
        kjv1769.getVerse({
          bookId: 'Genesis',
          chapterNumber: 1,
          verseNumber: 1
        })
      ).toMatchObject(genesis1_1)
    })

    it('should throw an error when passed an invalid book identifier', () => {
      // We only supplied data for the first three verses of Genesis 1 and
      // Genesis 2 to the constructor, so Exodus is an invalid book identifier
      // in our version.
      expect(() =>
        kjv1769.getVerse({ bookId: 'Exodus', chapterNumber: 1, verseNumber: 1 })
      ).toThrow('Book not found: Exodus')
    })

    it('should throw an error when passed an invalid chapter number', () => {
      expect(() =>
        kjv1769.getVerse({
          bookId: 'Genesis',
          chapterNumber: 3,
          verseNumber: 1
        })
      ).toThrow('Chapter not found: Genesis 3')
    })

    it('should throw an error when passed an invalid verse number', () => {
      expect(() =>
        kjv1769.getVerse({
          bookId: 'Genesis',
          chapterNumber: 1,
          verseNumber: 4
        })
      ).toThrow('Verse not found: Genesis 1:4')
    })
  })

  describe('BibleVersion.getPassage(GetPassageOptions)', () => {
    describe('should return the correct passage when passed:', () => {
      test('{ bookId: "Genesis", start: { chapterNumber: 1, verseNumber: 1 }, end: { chapterNumber: 1, verseNumber: 2 } }', () => {
        expect(
          kjv1769.getPassage({
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 1, verseNumber: 2 }
          })
        ).toMatchObject({
          bookId: 'Genesis',
          start: { chapterNumber: 1, verseNumber: 1 },
          end: { chapterNumber: 1, verseNumber: 2 },
          name: 'Genesis 1:1\u20132 (KJV1769)',
          verses: [genesis1_1, genesis1_2]
        })
      })

      test('{ bookId: "Genesis", start: { chapterNumber: 1, verseNumber: 1 }, end: { chapterNumber: 1, verseNumber: Infinity } }', () => {
        expect(
          kjv1769.getPassage({
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 1, verseNumber: Infinity }
          })
        ).toMatchObject(genesis1)
      })

      test('{ bookId: "Genesis", start: { chapterNumber: 1, verseNumber: 1 }, end: { chapterNumber: 1, verseNumber: 1000 } }', () => {
        expect(
          kjv1769.getPassage({
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 1, verseNumber: 1000 }
          })
        ).toMatchObject(genesis1)
      })

      test('{ bookId: "Genesis", start: { chapterNumber: 1, verseNumber: 1 }, end: { chapterNumber: 2, verseNumber: 2 } }', () => {
        expect(
          kjv1769.getPassage({
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 2, verseNumber: 2 }
          })
        ).toMatchObject({
          bookId: 'Genesis',
          start: { chapterNumber: 1, verseNumber: 1 },
          end: { chapterNumber: 2, verseNumber: 2 },
          name: 'Genesis 1\u20132:2 (KJV1769)',
          verses: [genesis1_1, genesis1_2, genesis1_3, genesis2_1, genesis2_2]
        })
      })

      test('{ bookId: "Genesis", start: { chapterNumber: 1, verseNumber: 2 }, end: { chapterNumber: 2, verseNumber: Infinity } }', () => {
        expect(
          kjv1769.getPassage({
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 2 },
            end: { chapterNumber: 2, verseNumber: Infinity }
          })
        ).toMatchObject({
          bookId: 'Genesis',
          start: { chapterNumber: 1, verseNumber: 2 },
          end: { chapterNumber: 2, verseNumber: 3 },
          name: 'Genesis 1:2\u20132:3 (KJV1769)',
          verses: [genesis1_2, genesis1_3, genesis2_1, genesis2_2, genesis2_3]
        })
      })

      test('{ bookId: "Genesis", start: { chapterNumber: 1, verseNumber: 2 }, end: { chapterNumber: 2, verseNumber: 2 } }', () => {
        expect(
          kjv1769.getPassage({
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 2 },
            end: { chapterNumber: 2, verseNumber: 2 }
          })
        ).toMatchObject({
          bookId: 'Genesis',
          start: { chapterNumber: 1, verseNumber: 2 },
          end: { chapterNumber: 2, verseNumber: 2 },
          name: 'Genesis 1:2\u20132:2 (KJV1769)',
          verses: [genesis1_2, genesis1_3, genesis2_1, genesis2_2]
        })
      })

      test('{ bookId: "Genesis", start: { chapterNumber: 1, verseNumber: 1 }, end: { chapterNumber: 2, verseNumber: Infinity } }', () => {
        expect(
          kjv1769.getPassage({
            bookId: 'Genesis',
            start: { chapterNumber: 1, verseNumber: 1 },
            end: { chapterNumber: 2, verseNumber: Infinity }
          })
        ).toMatchObject(genesis1_1_2_3)
      })
    })
  })
})
