import BookIdentifiers from './BookIdentifiers'
import localVersions from './localVersions'
import parse from './parse'

/** An API for the Bible. */
module.exports = {
  /** An enum of identifiers for books of the Bible. */
  BookIdentifiers,
  /** An object of local versions. */
  localVersions,
  /**
   * Parse a string for Bible references.
   *
   * @param options The options for parsing.
   * @return An array of options for `version.getPassage()` along with the version
   * to use.
   */
  parse
}

export default module.exports
