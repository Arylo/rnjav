import path from 'path'
import { COMPANY } from './constant'
import { IStrust } from './types'

const regexp = new RegExp([
  `(?<company>${COMPANY.join('|')})`,
  '[-_]?',
  '(?<number>\\d+)',
  '(?:[-_]?((CD)?(?<diskD>\\d)|(?<diskS>[A-B]))\\b)?',
].join(''), 'i')

export default (filenames: string[]) => {
  const results = filenames.map<IStrust|undefined>((filename) => {
    const extname = path.extname(filename)
    const basename = path.basename(filename, extname)
    const matches = basename.match(regexp)
    if (!matches) return undefined
    const keyword = matches[0]
    const index = matches.index as number
    const {
      company,
      number,
      diskD = 0,
      diskS,
    } = matches.groups || {}
    return {
      company: company.toUpperCase(),
      number,
      disk: diskS ? (diskS.toUpperCase().charCodeAt(0) - 64) : Number(diskD),
      keyword,
      index,
      pre: basename.substring(0, index),
      post: basename.substring(index + keyword.length),
      ext: extname.replace('.', '').toLowerCase(),
      base: basename,
      raw: filename,
    }
  }).filter(Boolean)
  return results as IStrust[]
}

