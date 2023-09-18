[![License](https://badgen.net/github/license/bible-api/bible-api)](../LICENSE.md)
[![TypeScript Style Guide](https://badgen.net/badge/code%20style/ts-standard/blue?icon=typescript)](https://github.com/standard/ts-standard)

# Bible API

An API for accessing the contents of the Bible.

---

#### Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

---

## Installation

Install this package:

```sh
# NPM
npm install @bible-api/bible-api

# Yarn
yarn add @bible-api/bible-api
```

Install the desired version(s) of the Bible (optional):

```sh
# NPM
npm install @bible-api/bible-api-version-kjv1769 @bible-api/bible-api-version-tr1624 @bible-api/bible-api-version-tr1894

# Yarn
yarn add @bible-api/kjv1769 @bible-api/tr1624 @bible-api/tr1894
```

## Usage

There are two ways to use this package: locally and remotely.

### Locally

If you installed the desired version(s) of the Bible, you can use them locally:

```js
const bibleApi = require('@bible-api/bible-api')

// Get the text of a verse
const verse = bibleApi.localVersions.kjv1769.getVerse(
  bibleApi.BookIdentifiers.Ephesians,
  1,
  4
)
console.log(`${verse.name}: ${verse.text}`)
// => Ephesians 1:4 (KJV1769): According as he hath chosen us in him before the
// => foundation of the world, that we should be holy and without blame before
// => him in love:

// Get a range of verses
const passage = bibleApi.localVersions.kjv1769.getPassage({
  bookId: bibleApi.BookIdentifiers.Romans,
  start: { chapterNumber: 5, verseNumber: 20 },
  end: { chapterNumber: 6, verseNumber: 2 }
})
console.log(
  `${passage.name}:\n${passage.verses
    .map(v => `${v.chapterNumber}:${v.verseNumber} ${v.text}`)
    .join('\n')}`
)
// => Romans 5:20–6:2 (KJV1769):
// => 5:20 Moreover the law entered, that the offence might abound. But where
// => sin abounded, grace did much more abound:
// => 5:21 That as sin hath reigned unto death, even so might grace reign
// => through righteousness unto eternal life by Jesus Christ our Lord.
// => 6:1 What shall we say then? Shall we continue in sin, that grace may
// => abound?
// => 6:2 God forbid. How shall we, that are dead to sin, live any longer
// => therein?

// Parse a string for references
const references = bibleApi.parse({ text: 'Ephesians 1:4–7; Romans 9:15–24' })
console.log(references)
// => [
// =>   {
// =>     version: bibleApi.localVersions.kjv1769,
// =>     getPassageOptions: {
// =>       bookId: 'Ephesians',
// =>       start: { chapterNumber: 1, verseNumber: 4 },
// =>       end: { chapterNumber: 1, verseNumber: 7 }
// =>     }
// =>   },
// =>   {
// =>     version: bibleApi.localVersions.kjv1769,
// =>     getPassageOptions: {
// =>       bookId: 'Romans',
// =>       start: { chapterNumber: 9, verseNumber: 15 },
// =>       end: { chapterNumber: 9, verseNumber: 24 }
// =>     }
// =>   }
// => ]
```

### Remotely

```js
const bibleApi = require('@bible-api/bible-api')

// Get the text of a verse
const verse = bibleApi.remote
  .requestVerse(bibleApi.BookIdentifiers.Ephesians, 1, 4)
  .then(verse => {
    console.log(`${verse.name}: ${verse.text}`)
    // => Ephesians 1:4 (KJV1769): According as he hath chosen us in him before
    // => the foundation of the world, that we should be holy and without blame
    // => before him in love:
  })

// Get a range of verses
const passage = bibleApi.remote
  .requestPassage({
    bookId: bibleApi.BookIdentifiers.Romans,
    start: { chapterNumber: 5, verseNumber: 20 },
    end: { chapterNumber: 6, verseNumber: 2 }
  })
  .then(passage => {
    console.log(
      `${passage.name}:\n${passage.verses
        .map(v => `${v.chapterNumber}:${v.verseNumber} ${v.text}`)
        .join('\n')}`
    )
    // => Romans 5:20–6:2 (KJV1769):
    // => 5:20 Moreover the law entered, that the offence might abound. But where
    // => sin abounded, grace did much more abound:
    // => 5:21 That as sin hath reigned unto death, even so might grace reign
    // => through righteousness unto eternal life by Jesus Christ our Lord.
    // => 6:1 What shall we say then? Shall we continue in sin, that grace may
    // => abound?
    // => 6:2 God forbid. How shall we, that are dead to sin, live any longer
    // => therein?
  })

// Parse a string for references
const references = bibleApi.parse({ text: 'Ephesians 1:4–7; Romans 9:15–24' })
console.log(references)
// => [
// =>   {
// =>     version: 'KJV1769',
// =>     getPassageOptions: {
// =>       bookId: 'Ephesians',
// =>       start: { chapterNumber: 1, verseNumber: 4 },
// =>       end: { chapterNumber: 1, verseNumber: 7 }
// =>     }
// =>   },
// =>   {
// =>     version: 'KJV1769',
// =>     getPassageOptions: {
// =>       bookId: 'Romans',
// =>       start: { chapterNumber: 9, verseNumber: 15 },
// =>       end: { chapterNumber: 9, verseNumber: 24 }
// =>     }
// =>   }
// => ]
```

## License

This project is licensed under the [MIT-0 License](../LICENSE.md).
