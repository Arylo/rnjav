import path from 'path'
import fs from 'fs'

const DEFAULT_OPTIONS = { cwd: process.cwd() }

export const findUp = (names: string | string[], options = DEFAULT_OPTIONS) => {
  const opts = Object.assign(DEFAULT_OPTIONS, options)
  const deep = opts.cwd.split(path.sep)
  const targetNames = typeof names === 'string' ? [names] : names
  for (let i = 0; i < deep.length; i++) {
    const upDeep = Array(i)
      .fill('..')
      .join('/')
    const basePath = path.resolve(options.cwd, upDeep)
    const exists = targetNames
      .map(name => path.resolve(basePath, name))
      .map(p => fs.existsSync(p))
    if (!exists.includes(false)) return basePath
  }
  return
}

export default findUp
