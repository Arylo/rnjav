import os from 'os'
import path from 'path'
import fs from 'fs'
import randomKey from './randomKey'
import toArray from '../../src/utils/toArray'

interface IGenTestFilesOptions {
  folder?: string | string[],
  file?: string | string[],
  basePath?: string,
}

const mkdirp = (filepath: string, basePath: string) => {
  const relative = path.relative(basePath, filepath)
  if (relative.startsWith('..')) {
    return false
  }
  const paths = relative.split(path.sep)
  let curPath = basePath
  for (const p of paths) {
    curPath = path.resolve(curPath, p)
    if (!fs.existsSync(curPath)) {
      fs.mkdirSync(curPath)
    }
  }
  return true
}

export const genTestFolder = (options: IGenTestFilesOptions = { }) => {
  const opts = Object.assign({ basePath: os.tmpdir() }, options)
  const basePath = path.resolve(opts.basePath, randomKey(8))
  mkdirp(basePath, opts.basePath)
  const folders = opts.folder ? toArray(opts.folder) : []
  const files = opts.file ? toArray(opts.file) : []
  for (const f of folders) {
    mkdirp(path.resolve(basePath, f), basePath)
  }
  for (const f of files) {
    const filepath = path.resolve(basePath, f)
    if (mkdirp(path.dirname(filepath), basePath)) {
      fs.writeFileSync(filepath, '', 'utf-8')
    }
  }
  return basePath
}

export default genTestFolder
