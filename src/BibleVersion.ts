/** The English name of a book in the Bible used as an identifier. */
export type BookIdentifier =
  | 'Genesis'
  | 'Exodus'
  | 'Leviticus'
  | 'Numbers'
  | 'Deuteronomy'
  | 'Joshua'
  | 'Judges'
  | 'Ruth'
  | '1 Samuel'
  | '2 Samuel'
  | '1 Kings'
  | '2 Kings'
  | '1 Chronicles'
  | '2 Chronicles'
  | 'Ezra'
  | 'Nehemiah'
  | 'Esther'
  | 'Job'
  | 'Psalms'
  | 'Proverbs'
  | 'Ecclesiastes'
  | 'Song of Solomon'
  | 'Isaiah'
  | 'Jeremiah'
  | 'Lamentations'
  | 'Ezekiel'
  | 'Daniel'
  | 'Hosea'
  | 'Joel'
  | 'Amos'
  | 'Obadiah'
  | 'Jonah'
  | 'Micah'
  | 'Nahum'
  | 'Habakkuk'
  | 'Zephaniah'
  | 'Haggai'
  | 'Zechariah'
  | 'Malachi'
  | 'Matthew'
  | 'Mark'
  | 'Luke'
  | 'John'
  | 'Acts'
  | 'Romans'
  | '1 Corinthians'
  | '2 Corinthians'
  | 'Galatians'
  | 'Ephesians'
  | 'Philippians'
  | 'Colossians'
  | '1 Thessalonians'
  | '2 Thessalonians'
  | '1 Timothy'
  | '2 Timothy'
  | 'Titus'
  | 'Philemon'
  | 'Hebrews'
  | 'James'
  | '1 Peter'
  | '2 Peter'
  | '1 John'
  | '2 John'
  | '3 John'
  | 'Jude'
  | 'Revelation'

/** The data of chapters in a book. */
type ChaptersData = [null, [null, ...string[]]]

/** The data of a book. */
interface BookData {
  /** The name of the book. */
  readonly name: string
  /** The chapters in the book. */
  readonly chaptersData: ChaptersData
}

/** A verse in the Bible. */
export interface Verse {
  /** The ID of the book. */
  readonly bookId: BookIdentifier
  /** The number of the chapter. */
  readonly chapterNumber: number
  /** The number of the verse. */
  readonly verseNumber: number
  /** The name of the verse. */
  readonly name: `${string} ${number}:${number} (${string})`
  /** An HTML representation of the verse. */
  readonly html: `<span class="bible__verse"><span class="bible__verse-number">${number}</span>${string}</span>`
  /** A Markdown representation of the verse. */
  readonly markdown: string
  /** A plain text representation of the verse. */
  readonly text: string
}

export interface Passage {
  /** The ID of the book. */
  readonly bookId: BookIdentifier
  /** The first verse in the passage. */
  readonly start: {
    /** The number of the first chapter. */
    readonly chapterNumber: number
    /** The number of the first verse. */
    readonly verseNumber: number
  }
  /** The last verse in the passage. */
  readonly end: {
    /** The number of the last chapter. */
    readonly chapterNumber: number
    /** The number of the last verse. */
    readonly verseNumber: number
  }
  /** The name of the passage. */
  readonly name:
    | `${string} ${number}:${number}-${number}:${number} (${string})`
    | `${string} ${number}:${number}-${number} (${string})`
    | `${string} ${number}:${number} (${string})`
  /** The verses in the passage. */
  readonly verses: readonly Verse[]
}

export interface GetVerseOptions {
  /** The ID of the book. */
  readonly bookId: BookIdentifier
  /** The number of the chapter. */
  readonly chapterNumber: number
  /** The number of the verse. */
  readonly verseNumber: number
}

/** Options for `.
 * ()`. */
export interface GetPassageOptions {
  /** The ID of the book. */
  readonly bookId: BookIdentifier
  /** The first verse in the passage. */
  readonly start: {
    /** The number of the first chapter. */
    readonly chapterNumber: number
    /** The number of the first verse. */
    readonly verseNumber: number
  }
  /** The last verse in the passage. */
  readonly end: {
    /** The number of the last chapter. */
    readonly chapterNumber: number
    /** The number of the last verse. */
    readonly verseNumber: number
  }
}

export interface BibleVersionOptions {
  /** Synonyms for the version. */
  readonly synonyms: string[]
  /** The year the version was published. */
  readonly year: number
  /** The short name of the version. */
  readonly shortName: string
  /** The long name of the version. */
  readonly longName: string
  /** The books in the version. */
  readonly booksData: Partial<Record<BookIdentifier, BookData>>
}

/** A Bible version. */
export default class BibleVersion implements BibleVersionOptions {
  /** Synonyms for the version. */
  public readonly synonyms: string[]
  /** The year the version was published. */
  public readonly year: number
  /** The short name of the version. */
  public readonly shortName: string
  /** The long name of the version. */
  public readonly longName: string
  /** The books in the version. */
  public readonly booksData: Partial<Record<BookIdentifier, BookData>>

  /**
   * Creates a new Bible version.
   *
   * @param options The options for creating the Bible version.
   */
  constructor(options: BibleVersionOptions) {
    this.synonyms = options.synonyms
    this.year = options.year
    this.shortName = options.shortName
    this.longName = options.longName
    this.booksData = options.booksData
  }

  /**
   * Gets a verse from the Bible.
   *
   * @param bookId The ID of the book.
   * @param chapterNumber The number of the chapter.
   * @param verseNumber The number of the verse.
   * @returns The verse.
   * @throws If the book, chapter, or verse is not found.
   */
  public getVerse(options: GetVerseOptions): Verse {
    const { bookId, chapterNumber, verseNumber } = options
    const book = this.booksData[bookId]

    if (!book) {
      throw new Error(`Book not found: ${bookId}`)
    }

    const chapterData = book.chaptersData[chapterNumber]

    if (!chapterData) {
      throw new Error(`Chapter not found: ${bookId} ${chapterNumber}`)
    }

    const verseData = chapterData[verseNumber]

    if (!verseData) {
      throw new Error(
        `Verse not found: ${bookId} ${chapterNumber}:${verseNumber}`
      )
    }

    return {
      bookId,
      chapterNumber,
      verseNumber,
      name: `${book.name} ${chapterNumber}:${verseNumber} (${this.shortName})`,
      html: ('<span class="bible__verse">' +
        `<span class="bible__verse-number">${verseNumber}</span>` +
        verseData
          .replace(
            /\*\*(?<jesus>.+)\*\*/g,
            '<span class="bible__jesus">$<jesus></span>'
          )
          .replace(/\*(?<italic>.+)\*/g, '<i>$<italic></i>') +
        '</span>') as any,
      markdown: verseData,
      text: verseData
        .replace(/\*\*(?<jesus>.+)\*\*/g, '$<jesus>')
        .replace(/\*(?<italic>.+)\*/g, '[$<italic>]')
    }
  }

  /**
   * Gets a passage from the Bible.
   *
   * @param options The options for getting the passage.
   * @returns The passage.
   * @throws If the book, a chapter, or a verse is not found.
   */
  public getPassage(options: GetPassageOptions): Passage {
    const { bookId, start, end } = options
    const book = this.booksData[bookId]

    if (!book) {
      throw new Error(`Book not found: ${bookId}`)
    }

    if (start.chapterNumber > end.chapterNumber) {
      throw new Error(`The first chapter cannot be after last chapter`)
    }

    if (
      start.chapterNumber === end.chapterNumber &&
      start.verseNumber > end.verseNumber
    ) {
      throw new Error(`The first verse cannot be after last verse`)
    }

    const endChapter = book.chaptersData[end.chapterNumber]
    if (!endChapter) {
      throw new Error(`Chapter not found: ${bookId} ${end.chapterNumber}`)
    }

    const endVerseNumber = Math.min(end.verseNumber, endChapter.length - 1)
    const verses: Verse[] = []

    for (
      let chapterNumber = start.chapterNumber;
      chapterNumber <= end.chapterNumber;
      chapterNumber++
    ) {
      const chapterData = book.chaptersData[chapterNumber]

      if (!chapterData) {
        throw new Error(`Chapter not found: ${bookId} ${chapterNumber}`)
      }

      for (
        let verseNumber =
          chapterNumber === start.chapterNumber ? start.verseNumber : 1;
        verseNumber <=
        (chapterNumber === end.chapterNumber
          ? endVerseNumber
          : chapterData.length - 1);
        verseNumber++
      ) {
        verses.push(this.getVerse({ bookId, chapterNumber, verseNumber }))
      }
    }

    let name = `${book.name} ${start.chapterNumber}`

    if (start.chapterNumber !== end.chapterNumber) {
      if (start.verseNumber === 1) {
        name += `\u2013${end.chapterNumber}`

        if (endVerseNumber !== endChapter.length - 1) {
          name += `:${endVerseNumber}`
        }
      } else {
        name += `:${start.verseNumber}\u2013${end.chapterNumber}:${endVerseNumber}`
      }
    } else if (start.verseNumber === end.verseNumber) {
      name += `:${start.verseNumber}`
    } else if (
      start.verseNumber !== 1 ||
      endVerseNumber !== endChapter.length - 1
    ) {
      name += `:${start.verseNumber}\u2013${endVerseNumber}`
    }

    name += ` (${this.shortName})`

    return {
      bookId,
      start: {
        chapterNumber: start.chapterNumber,
        verseNumber: start.verseNumber
      },
      end: {
        chapterNumber: end.chapterNumber,
        verseNumber: endVerseNumber
      },
      name: name as any,
      verses
    }
  }
}
