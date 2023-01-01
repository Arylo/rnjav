import * as companyFilter from './company'
import * as suffixFilter from './suffix'
import { IStrust } from './types'

const REQUIRED_FILTERS = [
  suffixFilter,
]

const OPTIONAL_FILTERS = [
  companyFilter,
]

export const filter = (filepath: string) => {
  const results = REQUIRED_FILTERS.map(f => f.filter(filepath))
  if (results.includes(false)) return false
  let result = false
  for (const curFilter of OPTIONAL_FILTERS) {
    result = result || curFilter.filter(filepath)
  }
  return result
}

const ANALYSIS_LIST = [
  companyFilter,
]

export const analysis = (filepaths: string[]) => {
  const result = filepaths.reduce<IStrust[]>((list, filepath) => {
    for (const filter of ANALYSIS_LIST) {
      const obj = filter.analysis(filepath)
      obj && list.push(obj)
    }
    return list
  }, [])
  return result
}

