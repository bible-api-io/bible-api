# Changelog

All notable changes to this project will be documented in this file.

The format is adapted from [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.11.0]: 2023-10-09Z

### Added

- Bible notes.

## [0.10.0]: 2023-10-05Z

### Changed

- The default version is now the Pure Cambridge Edition (PCE/KJV1900) version
  (remotely hosted on api.bible-api.io).

## [0.9.0]: 2023-10-05Z

### Added

- Pure Cambridge Edition (PCE/KJV1900) version (remotely hosted on
  api.bible-api.io).

## [0.8.0]: 2023-09-26Z

### Added

- Vulgata Latina version (remotely hosted on api.bible-api.io).

## [0.7.0]: 2023-09-25Z

### Added

- Allow colons (`:`) for chapter-only references.

## [0.6.0]: 2023-09-24Z

### Added

- `ParserReturn.match: RegExpMatchArray` property to `parse()` return type.

## [0.5.0]: 2023-09-24Z

### Added

- Biblia Gdańska version (remotely hosted on api.bible-api.io).

## [0.4.4]: 2023-09-23Z

### Fixed

- `Passage.name` now follows the format `<book name> <chapter>:<verse>` instead
  of `<book name> <chapter>:<first verse>-<last verse>` when `Passage.start` is
  the same as `Passage.end`.

## [0.4.3]: 2023-09-23Z

I forgot to build the package before publishing it to npm. This release is the
same as [0.4.1], but with the correct files.

### Fixed

- `remote.requestPassage(RequestPassageOptions)` now works with
  `end.verseNumber === Infinity`.

## [0.4.2]: 2023-09-23Z

### Fixed

- ~~`remote.requestPassage(RequestPassageOptions)` now works with
  `end.verseNumber === Infinity`.~~

## [0.4.1]: 2023-09-22Z

I forgot to build the package before publishing it to npm. This release is the
same as [0.4.0], but with the correct files.

### Added

- `remote.requestPassage(RequestPassageOptions)` function (again, this time for real).
- `remote.requestVerse(RequestVerseOptions)` function (again, this time for real).

## [0.4.0]: 2023-09-22Z

### Added

- ~~`remote.requestPassage(RequestPassageOptions)` function.~~
- ~~`remote.requestVerse(RequestVerseOptions)` function.~~

## [0.3.0]: 2023-09-21Z

### Changed

- Remote API requests now use `https://api.bible-api.io/` instead of `localhost:5409`.

## [0.2.2]: 2023-09-18Z

### Fixed

- updated incorrect version in [`package-lock.json`](./package-lock.json).
- removed incorrect information in this changelog.

## [0.2.1]: 2023-09-18Z

### Fixed

- updated incorrect name in [`package-lock.json`](./package-lock.json).

## [0.2.0]: 2023-09-18Z

### Added

- TypeScript type definitions.

## [0.1.0]: 2023-09-18Z

### Added

- `parse()` function.
- `localVersions.<version>.getPassage(GetPassageOptions)` function.
- `localVersions.<version>.getVerse(BookIdentifier, number, number)` function.

[unreleased]: https://github.com/bible-api-io/bible-api/compare/latest...HEAD
[0.8.0]: https://github.com/bible-api-io/bible-api/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/bible-api-io/bible-api/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/bible-api-io/bible-api/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/bible-api-io/bible-api/compare/v0.4.4...v0.5.0
[0.4.4]: https://github.com/bible-api-io/bible-api/compare/v0.4.3...v0.4.4
[0.4.3]: https://github.com/bible-api-io/bible-api/compare/v0.4.2...v0.4.3
[0.4.2]: https://github.com/bible-api-io/bible-api/compare/v0.4.1...v0.4.2
[0.4.1]: https://github.com/bible-api-io/bible-api/compare/v0.4.0...v0.4.1
[0.4.0]: https://github.com/bible-api-io/bible-api/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/bible-api-io/bible-api/compare/v0.2.2...v0.3.0
[0.2.2]: https://github.com/bible-api-io/bible-api/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/bible-api-io/bible-api/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/bible-api-io/bible-api/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bible-api-io/bible-api/compare/v0.0.0...v0.1.0
