import { SUFFIX } from '../constant'

const regexp = new RegExp(`\\.(${SUFFIX.join('|')})$`, 'i')

export const suffixFilterFn = (item: string) => regexp.test(item)

export default suffixFilterFn
