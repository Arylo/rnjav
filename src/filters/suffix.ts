import { VIDEO_SUFFIX } from '../constant'

const regexp = new RegExp(`\\.(${VIDEO_SUFFIX.map(s => s.toLowerCase()).join('|')})$`)

export const filter = (item: string) => regexp.test(item.toLowerCase())

export default filter
