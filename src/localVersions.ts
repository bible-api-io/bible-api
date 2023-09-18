import { existsSync } from 'fs'
import { join } from 'path'
import BibleVersion from './BibleVersion'
import type { BibleVersionOptions } from './BibleVersion'

/**
 * Get the root (top-most) package.json file as an object.
 *
 * @return The root package.json file as an object (or an empty object if the
 *         file does not exist).
 */
function getRootPackageJson(): Record<string, any> {
  for (let i = module.paths.length - 1; i > 0; i--) {
    const currentPath = join(module.paths[i]!, '..', 'package.json')
    if (existsSync(currentPath)) {
      return require(currentPath)
    }
  }

  return {}
}

/**
 * Validate a Bible version.
 *
 * @param versionData The version to validate.
 * @throws If the version is invalid.
 */
function validateVersion(
  versionData: BibleVersionOptions
): versionData is BibleVersionOptions {
  if (!Array.isArray(versionData.synonyms)) {
    throw new TypeError(
      `synonyms must be an array of strings, but is ${typeof versionData.synonyms}.`
    )
  }

  if (versionData.synonyms.length === 0) {
    throw new TypeError('`synonyms` must not be empty.')
  }

  for (const synonym of versionData.synonyms) {
    if (typeof synonym !== 'string') {
      throw new TypeError(
        `Invalid synonym: ${synonym}. Expected a string, but got ${typeof synonym}.`
      )
    }
  }

  if (typeof versionData.year !== 'number') {
    throw new TypeError(
      `year must be a number but is ${typeof versionData.year}.`
    )
  }

  if (typeof versionData.shortName !== 'string') {
    throw new TypeError(
      `shortName must be a string but is ${typeof versionData.shortName}.`
    )
  }

  if (typeof versionData.longName !== 'string') {
    throw new TypeError(
      `longName must be a string but is ${typeof versionData.longName}.`
    )
  }

  if (typeof versionData.booksData !== 'object') {
    throw new TypeError('`verses` must be an object.')
  }

  for (const bookId in versionData.booksData) {
    if (
      [
        'Genesis',
        'Exodus',
        'Leviticus',
        'Numbers',
        'Deuteronomy',
        'Joshua',
        'Judges',
        'Ruth',
        '1 Samuel',
        '2 Samuel',
        '1 Kings',
        '2 Kings',
        '1 Chronicles',
        '2 Chronicles',
        'Ezra',
        'Nehemiah',
        'Esther',
        'Job',
        'Psalms',
        'Proverbs',
        'Ecclesiastes',
        'Song of Solomon',
        'Isaiah',
        'Jeremiah',
        'Lamentations',
        'Ezekiel',
        'Daniel',
        'Hosea',
        'Joel',
        'Amos',
        'Obadiah',
        'Jonah',
        'Micah',
        'Nahum',
        'Habakkuk',
        'Zephaniah',
        'Haggai',
        'Zechariah',
        'Malachi',
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
      ].indexOf(bookId) === -1
    ) {
      throw new TypeError(`Invalid book ID: ${bookId}`)
    }

    /// @ts-expect-error
    const bookData = versionData.booksData[bookId]

    if (typeof bookData !== 'object') {
      throw new TypeError(
        `Invalid book data for ${bookId}. Expected an object, but got ${typeof bookData}.`
      )
    }

    if (typeof bookData.name !== 'string') {
      throw new TypeError(`Invalid book name: ${bookData.name}`)
    }

    if (!Array.isArray(bookData.chaptersData)) {
      throw new TypeError(
        `Invalid chapters data for ${bookId}. Expected an aray, but got ${typeof bookData.chaptersData}.`
      )
    }

    if (bookData.chaptersData.length < 2) {
      throw new TypeError(
        `Expected at least two elements in ${bookId}.chaptersData, but got ${bookData.chaptersData.length}.`
      )
    }

    if (bookData.chaptersData[0] !== null) {
      throw new TypeError(
        `Expected ${bookId}.chaptersData[0] to be null, but got ${typeof bookData
          .chaptersData[0]}.`
      )
    }

    for (let i = 1; i < bookData.chaptersData.length; i++) {
      const chapterData = bookData.chaptersData[i]

      if (!Array.isArray(chapterData)) {
        throw new TypeError(
          `Invalid chapter data for ${bookId} ${i}. Expected an array, but got ${typeof chapterData}.`
        )
      }

      if (chapterData.length < 2) {
        throw new TypeError(
          `Expected at least two elements in ${bookId}.chaptersData[${i}], but it is ${chapterData.length}.`
        )
      }

      if (chapterData[0] !== null) {
        throw new TypeError(
          `Expected ${bookId}.chaptersData[${i}][0] to be null, but it is ${typeof chapterData[0]}.`
        )
      }

      for (let j = 1; j < chapterData.length; j++) {
        const verseData = chapterData[j]

        if (typeof verseData !== 'string') {
          throw new TypeError(
            `Invalid verse data for ${bookId} ${i}:${j}. Expected a string, but got ${typeof verseData}.`
          )
        }
      }
    }
  }

  return true
}

/**
 * Load local Bible versions.
 *
 * @return The object to load the versions into.
 */
function loadLocalBibleVersions(): Record<string, BibleVersion> {
  const rootPackageJson = getRootPackageJson()
  if (!rootPackageJson) return {}

  const dependencies = Object.keys(rootPackageJson['dependencies'] ?? {})

  if (!dependencies) return {}

  const versionsObject: Record<string, BibleVersion> = {}
  for (const dependency of dependencies) {
    if (dependency.match(/^(?:@[^\/]+\/)?bible-api-version-/)) {
      const versionId = dependency.replace(
        /^(?:@[^\/]+\/)bible-api-version-/,
        ''
      )
      const versionData = require(dependency)

      if (!validateVersion(versionData)) continue

      versionsObject[versionId] = new BibleVersion(versionData)
    }
  }

  return versionsObject
}

export default loadLocalBibleVersions()
