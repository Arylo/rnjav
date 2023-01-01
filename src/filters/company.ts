import path from 'path'
import { COMPANY } from '../constant'
import { IStrust } from './types'

const regexp = {
  filter: new RegExp(`(${COMPANY.join('|')})`, 'i'),
  analysis: new RegExp([
    `(?<company>${COMPANY.join('|')})`,
    '[-_]?',
    '(?<number>\\d+)',
    '(?:[-_]?((CD)?(?<diskD>\\d)|(?<diskS>[A-B]))\\b)?',
  ].join(''), 'i'),
}

export const filter = (item: string) => regexp.filter.test(item)

export const analysis = (filepath: string): IStrust | undefined => {
  const filename = path.basename(filepath)

  const extname = path.extname(filename)
  const basename = path.basename(filename, extname)
  const matches = basename.match(regexp.analysis)
  if (!matches) return undefined
  const keyword = matches[0]
  const index = matches.index as number
  const {
    company,
    number,
    diskD = 0,
    diskS,
  } = matches.groups || {}
  const obj = {
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
    path: path.dirname(filepath),
    get target() {
      const diskName = obj.disk > 0 ? `-CD${obj.disk}` : ''
      const targetName = `${obj.company}-${obj.number}${diskName}.${obj.ext}`
      return targetName
    },
  }
  return obj
}

export default filter
