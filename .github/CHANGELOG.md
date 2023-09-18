# Changelog

All notable changes to this project will be documented in this file.

The format is adapted from [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- TypeScript type definitions (hopefully).

## [0.1.0]: 2023-09-18Z

### Added

- Bible versions: KJV1769, TR1624, and TR1894.
- `parse()` function.
- `localVersions.<version>.getPassage(GetPassageOptions)` function.
- `localVersions.<version>.getVerse(BookIdentifier, number, number)` function.
- `remote.requestPassage(RequestPassageOptions)` function.
- `remote.requestVerse(RequestVerseOptions)` function.

[unreleased]: https://github.com/gimjb/bible-api-local/compare/latest...HEAD
[0.1.0]: https://github.com/gimjb/bible-api-local/compare/v0.0.0...v0.1.0
