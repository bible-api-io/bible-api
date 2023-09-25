import BibleVersion from './BibleVersion'
import type { BookIdentifier, GetPassageOptions } from './BibleVersion'
import localVersions from './localVersions'

type RemoteVersionIdentifier = 'KJV1769' | 'TR1624' | 'TR1894' | 'BG'

/**
 * Create a map of book name synonyms to book IDs or remote version name
 * synonyms to remote version IDs.
 *
 * @param synonyms The book name synonyms.
 * @return The map of book name synonyms to book IDs.
 */
function createSynonymsMap(
  synonyms: Array<
    [BookIdentifier | RemoteVersionIdentifier, ...string[]]
  >
): Map<string, BookIdentifier | RemoteVersionIdentifier> {
  const map = new Map<
    string,
    BookIdentifier | RemoteVersionIdentifier
  >()

  for (const synonymGroup of synonyms) {
    for (const synonym of synonymGroup) {
      map.set(synonym.toLowerCase().replace(/\s+/g, ''), synonymGroup[0])
    }
  }

  return map
}

/** An array of book name synonyms. */
const bookNameSynonyms = [
  ['Genesis', 'Gen', 'Gn'],
  ['Exodus', 'Exod', 'Ex'],
  ['Leviticus', 'Lev', 'Lv'],
  ['Numbers', 'Num', 'Nm'],
  ['Deuteronomy', 'Deut', 'Dt'],
  ['Joshua', 'Josh', 'Jos', 'Jsh'],
  ['Judges', 'Judg', 'Jdg', 'Jg', 'Jdgs'],
  ['Ruth', 'Rth', 'Ru'],
  [
    '1 Samuel',
    '1 Sam',
    '1 Sa',
    '1S',
    'I Samuel',
    'I Sam',
    'I Sa',
    '1st Samuel',
    'First Samuel'
  ],
  [
    '2 Samuel',
    '2 Sam',
    '2 Sa',
    '2S',
    'II Samuel',
    'II Sam',
    'II Sa',
    '2nd Samuel',
    'Second Samuel'
  ],
  [
    '1 Kings',
    '1 Kgs',
    '1 Ki',
    '1K',
    'I Kings',
    'I Kgs',
    'I Ki',
    '1st Kings',
    'First Kings'
  ],
  [
    '2 Kings',
    '2 Kgs',
    '2 Ki',
    '2K',
    'II Kings',
    'II Kgs',
    'II Ki',
    '2nd Kings',
    'Second Kings'
  ],
  [
    '1 Chronicles',
    '1 Chron',
    '1 Ch',
    '1 Chr',
    'I Chronicles',
    'I Chron',
    'I Ch',
    '1st Chronicles',
    'First Chronicles'
  ],
  [
    '2 Chronicles',
    '2 Chron',
    '2 Ch',
    'II Chronicles',
    'II Chron',
    'II Ch',
    '2nd Chronicles',
    'Second Chronicles'
  ],
  ['Ezra', 'Ezr'],
  ['Nehemiah', 'Neh', 'Ne'],
  ['Esther', 'Esth', 'Est', 'Es'],
  ['Job', 'Jb'],
  ['Psalms', 'Psalm', 'Ps', 'Psa', 'Psm', 'Pss'],
  ['Proverbs', 'Prov', 'Prv', 'Pr', 'Pro'],
  ['Ecclesiastes', 'Eccles', 'Eccl', 'Ecc', 'Qoh', 'Qoheleth'],
  [
    'Song of Solomon',
    'Song of Songs',
    'Song',
    'SOS',
    'Canticle of Canticles',
    'Canticles',
    'Cant',
    'Can'
  ],
  ['Isaiah', 'Isa', 'Is'],
  ['Jeremiah', 'Jer', 'Je', 'Jr'],
  ['Lamentations', 'Lam', 'La'],
  ['Ezekiel', 'Ezek', 'Eze', 'Ezk'],
  ['Daniel', 'Dan', 'Da', 'Dn'],
  ['Hosea', 'Hos', 'Ho'],
  ['Joel', 'Jl', 'Joe'],
  ['Amos', 'Am'],
  ['Obadiah', 'Obad', 'Ob'],
  ['Jonah', 'Jon'],
  ['Micah', 'Mic'],
  ['Nahum', 'Nah'],
  ['Habakkuk', 'Hab', 'Hb'],
  ['Zephaniah', 'Zeph', 'Zep', 'Zp'],
  ['Haggai', 'Hag', 'Hg'],
  ['Zechariah', 'Zech', 'Zec', 'Zc'],
  ['Malachi', 'Mal', 'Ml'],
  ['Matthew', 'Matt', 'Mat', 'Mt'],
  ['Mark', 'Mk', 'Mr'],
  ['Luke', 'Lk', 'Lu'],
  ['John', 'Jn', 'Jhn'],
  ['Acts', 'Act', 'Ac'],
  ['Romans', 'Rom', 'Ro', 'Rm'],
  [
    '1 Corinthians',
    '1 Cor',
    '1 Co',
    'I Corinthians',
    'I Cor',
    'I Co',
    '1st Corinthians',
    'First Corinthians'
  ],
  [
    '2 Corinthians',
    '2 Cor',
    '2 Co',
    'II Corinthians',
    'II Cor',
    'II Co',
    '2nd Corinthians',
    'Second Corinthians'
  ],
  ['Galatians', 'Gal', 'Ga'],
  ['Ephesians', 'Eph', 'Ep'],
  ['Philippians', 'Phil', 'Php', 'Pp'],
  ['Colossians', 'Col', 'Co'],
  [
    '1 Thessalonians',
    '1 Thess',
    '1 Th',
    'I Thessalonians',
    'I Thess',
    'I Th',
    '1st Thessalonians',
    'First Thessalonians'
  ],
  [
    '2 Thessalonians',
    '2 Thess',
    '2 Th',
    'II Thessalonians',
    'II Thess',
    'II Th',
    '2nd Thessalonians',
    'Second Thessalonians'
  ],
  [
    '1 Timothy',
    '1 Tim',
    '1 Ti',
    'I Timothy',
    'I Tim',
    'I Ti',
    '1st Timothy',
    'First Timothy'
  ],
  [
    '2 Timothy',
    '2 Tim',
    '2 Ti',
    'II Timothy',
    'II Tim',
    'II Ti',
    '2nd Timothy',
    'Second Timothy'
  ],
  ['Titus', 'Ti', 'Tt'],
  ['Philemon', 'Philem', 'Phm', 'Pm'],
  ['Hebrews', 'Heb', 'He'],
  ['James', 'Jas', 'Jm'],
  [
    '1 Peter',
    '1 Pet',
    '1 Pe',
    'I Peter',
    'I Pet',
    'I Pe',
    '1st Peter',
    'First Peter'
  ],
  [
    '2 Peter',
    '2 Pet',
    '2 Pe',
    'II Peter',
    'II Pet',
    'II Pe',
    '2nd Peter',
    'Second Peter'
  ],
  [
    '1 John',
    '1 Jn',
    '1 Jhn',
    'I John',
    'I Jn',
    'I Jhn',
    '1st John',
    '1st Jn',
    '1st Jhn',
    'First John',
    'First Jn',
    'First Jhn'
  ],
  [
    '2 John',
    '2 Jn',
    '2 Jhn',
    'II John',
    'II Jn',
    'II Jhn',
    '2nd John',
    '2nd Jn',
    '2nd Jhn',
    'Second John',
    'Second Jn',
    'Second Jhn'
  ],
  [
    '3 John',
    '3 Jn',
    '3 Jhn',
    'III John',
    'III Jn',
    'III Jhn',
    '3rd John',
    '3rd Jn',
    '3rd Jhn',
    'Third John',
    'Third Jn',
    'Third Jhn'
  ],
  ['Jude', 'Jud', 'Jd'],
  ['Revelation', 'Revelations', 'Rev', 'Re']
]
/** A map of book name synonyms to book IDs. */
const bookNameSynonymMap = createSynonymsMap(bookNameSynonyms as any) as Map<
  string,
  BookIdentifier
>

function createVersionSynonymsMap(
  localVersions: BibleVersion[]
): Map<string, BibleVersion> {
  const map = new Map<string, BibleVersion>()

  for (const version of localVersions) {
    for (const synonym of version.synonyms) {
      const preexistingVersion = map.get(
        synonym.toLowerCase().replace(/\s/g, '')
      )
      if (!preexistingVersion || version.year > preexistingVersion.year) {
        map.set(synonym.toLowerCase().replace(/\s/g, ''), version)
      }
    }
  }

  return map
}

const versionSynonyms = Object.values(localVersions).flatMap(x => x.synonyms)
const versionSynonymsMap = createVersionSynonymsMap(
  Object.values(localVersions)
)
const remoteVersionSynonyms: [RemoteVersionIdentifier, ...string[]][] =
  [
    [
      'KJV1769',
      'KJV',
      'King James Version',
      'King James Version (1769)',
      'King James Version 1769',
      'King James Bible (1769)',
      'King James Bible 1769',
      'King James (1769)',
      'King James 1769'
    ],
    ['TR1624', 'Textus Receptus (1624)', 'Textus Receptus 1624', 'Elzevir'],
    [
      'TR1894',
      'TR',
      'Textus Receptus',
      'Textus Receptus (1894)',
      'Textus Receptus 1894',
      'Scrivener'
    ],
    [
      'BG',
      'Biblia Gdańska',
      'Biblia Gdanska',
      'Polish Biblia Gdańska',
      'Polish Biblia Gdanska',
      'PBG'
    ]
  ]
const remoteVersionSynonymsMap = createSynonymsMap(
  remoteVersionSynonyms
) as Map<string, RemoteVersionIdentifier>

/**
 * Create a regular expression to parse Bible references.
 *
 * @return The regular expression to parse Bible references.
 */
function createRegex() {
  const bookNames = bookNameSynonyms.flat()
  return new RegExp(
    `(?:^|[-\\s^!"#$%&'()*+,./:;<=>?@\\\\\\]^_\`{|}~])(?<bookName>${bookNames
      .join('|')
      .replace(
        /\s+/g,
        '\\.?[^\\S\\r\\n]*'
      )})\\.?[^\\S\\r\\n]*(?:(?<firstChapter1>\\d+):|(?<firstChapter2>\\d+)(?:\\.?[^\\S\\r\\n]*[-–—]\\.?[^\\S\\r\\n]*(?<lastChapter1>\\d+)(?:\\.?[^\\S\\r\\n]*[.:;]\\.?[^\\S\\r\\n]*(?<lastVerse1>\\d+))?|\\.?[^\\S\\r\\n]*[.:;]\\.?[^\\S\\r\\n]*(?<firstVerse>\\d+)(?:\\.?[^\\S\\r\\n]*[-–—]\\.?[^\\S\\r\\n]*(?<lastChapter2>\\d+)[.:;](?<lastVerse2>\\d+)|\\.?[^\\S\\r\\n]*[-–—]\\.?[^\\S\\r\\n]*(?<lastVerse3>\\d+)|(?<onwards>[-–—]))?))?\\.?[^\\S\\r\\n]*\\(?\\.?[^\\S\\r\\n]*(?<version>${[
      ...versionSynonyms,
      ...remoteVersionSynonyms.flat()
    ]
      .sort((a, b) => b.length - a.length)
      .join('|')
      .replace(/\s+/g, '\\.?[^\\S\\r\\n]*')})?`,
    'gi'
  )
}

/** A regular expression to parse Bible references. */
const regex = createRegex()

/**
 * Parse a Bible version string.
 *
 * @param str The string to parse.
 * @param defaultVersion The default version to fall back to.
 * @return The parsed Bible version.
 */
function parseBibleVersionString(
  str: string | undefined,
  defaultVersion: string
): BibleVersion | string | undefined {
  return (
    versionSynonymsMap.get(str?.toLowerCase().replace(/\.?\s+/g, '') ?? '') ??
    versionSynonymsMap.get(
      defaultVersion.toLowerCase().replace(/\.?\s+/g, '')
    ) ??
    remoteVersionSynonymsMap.get(
      str?.toLowerCase().replace(/\.?\s+/g, '') ?? ''
    ) ??
    defaultVersion
  )
}

/** The return value of `parse()`. */
export interface ParserReturn {
  readonly match: RegExpMatchArray
  /** The BibleVersion instance to use. */
  readonly version: BibleVersion | string | undefined
  /** Options for `version.getPassage()`. */
  readonly getPassageOptions: GetPassageOptions
}

/**
 * Parse a Bible reference.
 *
 * @param match The match to parse.
 * @param defaultVersion The default version to fall back to.
 * @return Options for `version.getPassage()`.
 */
function parseMatch(
  match: RegExpMatchArray,
  defaultVersion: string = 'KJV1769'
): ParserReturn | null {
  const { groups } = match
  if (!groups) return null

  const version = parseBibleVersionString(groups['version'], defaultVersion)
  const bookName = groups['bookName']?.toLowerCase()?.replace(/\.|\s+/g, '')
  const bookId = bookNameSynonymMap.get(bookName ?? '')

  if (!bookId) return null

  if (
    (version === 'TR1624' ||
      version === 'TR1894' ||
      (version as BibleVersion | undefined)?.shortName === 'TR1624' ||
      (version as BibleVersion | undefined)?.shortName === 'TR1894') &&
    ![
      'Matthew',
      'Mark',
      'Luke',
      'John',
      'Acts',
      'Romans',
      '1 Corinthians',
      '2 Corinthians',
      'Galatians',
      'Ephesians',
      'Philippians',
      'Colossians',
      '1 Thessalonians',
      '2 Thessalonians',
      '1 Timothy',
      '2 Timothy',
      'Titus',
      'Philemon',
      'Hebrews',
      'James',
      '1 Peter',
      '2 Peter',
      '1 John',
      '2 John',
      '3 John',
      'Jude',
      'Revelation'
    ].includes(bookId)
  ) {
    return null
  }

  const firstChapterNumber = Number(groups['firstChapter'])
  const firstVerseNumber = Number(groups['firstVerse'] ?? 1)
  const lastChapterNumber = Number(
    groups['lastChapter1'] ?? groups['lastChapter2'] ?? firstChapterNumber
  )
  const lastVerseNumber = groups['onwards']
    ? Infinity
    : Number(
        groups['lastVerse1'] ??
          groups['lastVerse2'] ??
          groups['lastVerse3'] ??
          groups['firstVerse'] ??
          Infinity
      )

  if (firstChapterNumber > lastChapterNumber) return null
  if (
    firstChapterNumber === lastChapterNumber &&
    firstVerseNumber > lastVerseNumber
  )
    return null

  return {
    match,
    version,
    getPassageOptions: {
      bookId,
      start: {
        chapterNumber: firstChapterNumber,
        verseNumber: firstVerseNumber
      },
      end: {
        chapterNumber: lastChapterNumber,
        verseNumber: lastVerseNumber
      }
    }
  }
}

/** Options for `parse()`. */
export interface ParseOptions {
  /** The short name of the default Bible version to use. */
  readonly defaultVersion?: string
  /** The text to parse. */
  readonly text: string
}

/**
 * Parse a string for Bible references.
 *
 * @param options The options for parsing.
 * @return An array of options for `version.getPassage()` along with the version
 * to use.
 */
export default function parse(options: ParseOptions): ParserReturn[] {
  const { defaultVersion = 'KJV1769', text } = options

  const returnData: ParserReturn[] = []
  for (const match of text.matchAll(regex)) {
    const parserReturn = parseMatch(match, defaultVersion)
    if (!parserReturn) continue

    returnData.push(parserReturn)
  }

  return returnData.sort((a, b) => (a.match.index ?? 0) - (b.match.index ?? 0))
}
