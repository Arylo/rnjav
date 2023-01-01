import fs from 'fs'
import path from 'path'
import { COMPANY, VIDEO_SUFFIX } from '../constant'
import findUp from '../utils/findUp'

export const getPkgPath = () => {
  const rootPath = findUp('package.json', { cwd: __dirname })
  if (!rootPath) return
  const p = path.resolve(rootPath, 'package.json')
  if (fs.statSync(p).isFile()) return p
  return
}

export const displayBanner = () => {
  const pkgPath = getPkgPath()
  if (pkgPath) {
    const pkgInfo = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    console.log(`Running ${pkgInfo.name}@v${pkgInfo.version}...`)
  } else {
    console.warn('Running Process, But get process info fail')
  }

  console.log(`Support company count: ${COMPANY.length}`)
  console.log(`Support video format file: ${VIDEO_SUFFIX.join(', ')}`)
}

export default displayBanner
