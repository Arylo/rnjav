import fs from 'fs'
import path from 'path'

// eslint-disable-next-line import/no-mutable-exports
export let COMPANY: string[] = []

// eslint-disable-next-line import/no-mutable-exports
export let VIDEO_SUFFIX: string[] = []

try {
  COMPANY = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../static/company.json'), 'utf-8'))
} catch (error) {
}

COMPANY = COMPANY
  .map(a => a.toUpperCase())
  .sort((a, b) => b.length - a.length)

try {
  VIDEO_SUFFIX = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../static/videoSuffix.json'), 'utf-8'))
} catch (error) {
}
