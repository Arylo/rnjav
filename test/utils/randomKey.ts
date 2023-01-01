import toMd5 from './toMd5'

export const randomKey = (length = 32) => {
  const str = `${Date.now()}_${Math.random()}`
  return toMd5(str).slice(0, length)
}

export default randomKey
