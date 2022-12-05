import { VIDEO_SUFFIX } from '../constant'

const regexp = new RegExp(`\\.(${VIDEO_SUFFIX.join('|')})$`, 'i')

export const suffixFilterFn = (item: string) => regexp.test(item)

export default suffixFilterFn
