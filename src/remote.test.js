const remote = require('./remote')

const eph1_4 = {
  bookId: 'Ephesians',
  chapterNumber: 1,
  verseNumber: 4,
  html: '<span class="bible__verse"><span class="bible__verse-number">4</span>According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love:</span>',
  markdown:
    'According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love:',
  text: 'According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love:'
}

describe('remote', () => {
  describe('.requestVerse(RequestVerseOptions)', () => {
    it('should resolve to the correct verse', () => {
      return remote
        .requestVerse({
          version: 'KJV1769',
          bookId: 'Ephesians',
          chapterNumber: 1,
          verseNumber: 4
        })
        .then(verse => {
          expect(verse).toMatchObject(eph1_4)
        })
    })

    it('should reject when the request is invalid', () => {
      return remote
        .requestVerse({
          version: 'KJV1769',
          bookId: 'Ephesians',
          chapterNumber: 1,
          verseNumber: 999
        })
        .catch(error => {
          expect(error).toBeDefined()
        })
    })
  })

  describe('.requestPassage(RequestPassageOptions)', () => {
    it('should resolve to the correct passage', () => {
      return remote
        .requestPassage({
          version: 'KJV1769',
          bookId: 'Ephesians',
          start: {
            chapterNumber: 1,
            verseNumber: 4
          },
          end: {
            chapterNumber: 1,
            verseNumber: 7
          }
        })
        .then(passage => {
          expect(passage).toMatchObject({
            bookId: 'Ephesians',
            start: {
              chapterNumber: 1,
              verseNumber: 4
            },
            end: {
              chapterNumber: 1,
              verseNumber: 7
            },
            verses: [
              eph1_4,
              {
                bookId: 'Ephesians',
                chapterNumber: 1,
                verseNumber: 5,
                html: '<span class="bible__verse"><span class="bible__verse-number">5</span>Having predestinated us unto the adoption of children by Jesus Christ to himself, according to the good pleasure of his will,</span>',
                markdown:
                  'Having predestinated us unto the adoption of children by Jesus Christ to himself, according to the good pleasure of his will,',
                text: 'Having predestinated us unto the adoption of children by Jesus Christ to himself, according to the good pleasure of his will,'
              },
              {
                bookId: 'Ephesians',
                chapterNumber: 1,
                verseNumber: 6,
                html: '<span class="bible__verse"><span class="bible__verse-number">6</span>To the praise of the glory of his grace, wherein he hath made us accepted in the beloved.</span>',
                markdown:
                  'To the praise of the glory of his grace, wherein he hath made us accepted in the beloved.',
                text: 'To the praise of the glory of his grace, wherein he hath made us accepted in the beloved.'
              },
              {
                bookId: 'Ephesians',
                chapterNumber: 1,
                verseNumber: 7,
                html: '<span class="bible__verse"><span class="bible__verse-number">7</span>In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace;</span>',
                markdown:
                  'In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace;',
                text: 'In whom we have redemption through his blood, the forgiveness of sins, according to the riches of his grace;'
              }
            ]
          })
        })
    })

    it('should reject when the request is invalid', () => {
      return remote
        .requestPassage({
          version: 'KJV1769',
          bookId: 'Ephesians',
          start: {
            chapterNumber: 1,
            verseNumber: 4
          },
          end: {
            chapterNumber: 1,
            verseNumber: 999
          }
        })
        .catch(error => {
          expect(error).toBeDefined()
        })
    })
  })
})
