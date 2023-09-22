# Changelog

All notable changes to this project will be documented in this file.

The format is adapted from [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0]: 2023-09-22Z

### Added

- `remote.requestPassage(RequestPassageOptions)` function.
- `remote.requestVerse(RequestVerseOptions)` function.

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

[unreleased]: https://github.com/gimjb/bible-api-local/compare/latest...HEAD
[0.1.0]: https://github.com/gimjb/bible-api-local/compare/v0.0.0...v0.1.0
