import { analysis } from '../../filters'
import { INewObject } from './type'

export const transformObjects = (filepaths: string[]) => {
  const result = analysis(filepaths)
  const map = result.reduce<{[path: string]: INewObject}>((map, obj) => {
    if (!map[obj.path]) {
      Object.assign(map, {
        [obj.path]: {
          list: [],
          keywordCount: {},
        },
      })
    }
    const curObj = map[obj.path]
    curObj.list.push(obj)
    if (!curObj.keywordCount[obj.target]) {
      curObj.keywordCount[obj.target] = 0
    }
    curObj.keywordCount[obj.target] += 1
    return map
  }, { })
  return Object.values(map)
}

export default transformObjects
