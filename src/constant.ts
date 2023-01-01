import fs from 'fs'
import path from 'path'
import findUp from './utils/findUp'

// eslint-disable-next-line import/no-mutable-exports
export let COMPANY: string[] = []

// eslint-disable-next-line import/no-mutable-exports
export let VIDEO_SUFFIX: string[] = []

try {
  const name = 'static/company.json'
  const basePath = findUp(name, { cwd: __dirname })
  if (basePath) {
    COMPANY = JSON.parse(fs.readFileSync(path.resolve(basePath, name), 'utf-8'))
  }
} catch (error) {
}

COMPANY = COMPANY
  .map(a => a.toUpperCase())
  .sort((a, b) => b.length - a.length)

try {
  const name = 'static/videoSuffix.json'
  const basePath = findUp(name, { cwd: __dirname })
  if (basePath) {
    VIDEO_SUFFIX = JSON.parse(fs.readFileSync(path.resolve(basePath, name), 'utf-8'))
  }
} catch (error) {
}
