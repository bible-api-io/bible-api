import https from 'https'
import {
  GetPassageOptions,
  GetVerseOptions,
  Passage,
  Verse
} from './BibleVersion'

type RemoteBibleVersion = 'KJV1769' | 'TR1624' | 'TR1894'

interface RequestVerseOptions extends GetVerseOptions {
  version: RemoteBibleVersion
}

interface RequestPassageOptions extends GetPassageOptions {
  version: RemoteBibleVersion
}

const remoteUrl = 'https://api.bible-api.io/'
let agent: https.Agent

function request(options: { headers: object; body: object }): Promise<object> {
  if (!agent) {
    agent = new https.Agent({ keepAlive: true, maxSockets: 1 })
  }

  return new Promise((resolve, reject) => {
    let responseBody = ''
    const request = https.request(
      remoteUrl,
      {
        agent,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json'
        }
      },
      response => {
        response.on('error', reject)
        response.on('data', chunk => {
          responseBody += chunk
        })
        response.on('end', () => {
          try {
            resolve(JSON.parse(responseBody))
          } catch (error) {
            reject(error)
          }
        })
      }
    )

    request.write(JSON.stringify(options.body))
    request.end()
  })
}

export function requestVerse(options: RequestVerseOptions): Promise<Verse> {
  const { version, bookId, chapterNumber, verseNumber } = options

  return request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: {
      version,
      getVerseOptions: { bookId, chapterNumber, verseNumber }
    }
  }) as Promise<Verse>
}

export function requestPassage(
  options: RequestPassageOptions
): Promise<Passage> {
  const { version, bookId, start, end } = options

  return request({
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json'
    },
    body: {
      version,
      getPassageOptions: { bookId, start, end }
    }
  }) as Promise<Passage>
}
