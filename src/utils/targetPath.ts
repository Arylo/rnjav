import fs from 'fs'
import path from 'path'
import exitError from './exitError'

let targetPath = process.cwd()

export const set = (filepath: string) => {
  const newPath = path.resolve(process.cwd(), path.relative(process.cwd(), filepath))
  if (!fs.existsSync(newPath)) {
    exitError(`Not Found Directory ${filepath || newPath}`)
  }
  if (!fs.statSync(newPath).isDirectory()) {
    exitError(`${filepath} is not directory`)
  }
  targetPath = newPath
}

export const get = () => targetPath

export default {
  set, get,
}
