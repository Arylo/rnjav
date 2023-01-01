import { IStrust } from '../../filters/types'

export interface INewObject {
  list: IStrust[],
  keywordCount: {
    [name: string]: number,
  },
}

