import path from 'path'
import fs from 'fs'
import * as filters from '../../filters'
import { getCliParams } from '../../utils/getCliParams'

const DEFAULT_PATHS = [process.cwd()]

export const getPaths = (paths: string[]) => {
  const targetPaths = (paths.length ? paths : DEFAULT_PATHS)
    .map(p => path.resolve(process.cwd(), p))
  const list: string[] = []
  for (const targetPath of targetPaths) {
    if (!fs.existsSync(targetPath)) {
      continue
    }
    const targetStat = fs.statSync(targetPath)
    if (targetStat.isFile()) {
      list.push(targetPath)
      continue
    }
    if (targetStat.isDirectory()) {
      fs.readdirSync(targetPath)
        .map(p => path.resolve(targetPath, p))
        .filter(p => fs.statSync(p).isFile())
        .forEach(p => list.push(p))
    }
  }
  return list
}

export const transformPaths = (paths: string[] = getCliParams()['--']) => {
  const list = getPaths(paths)
  return list.filter(p => filters.filter(p))
}

export default transformPaths
