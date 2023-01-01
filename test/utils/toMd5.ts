import crypto from 'crypto'

export const toMd5 = (str: string) => {
  const md5 = crypto.createHash('md5')
  return md5.update(str).digest('hex')
}

export default toMd5
