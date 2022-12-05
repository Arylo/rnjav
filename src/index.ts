import fs from 'fs'
import path from 'path'
import suffixFilterFn from './filters/suffix'
import companyFilterFn from './filters/company'
import targetPath from './utils/targetPath'
import handler from './handler'
import action from './action'
import { COMPANY, VIDEO_SUFFIX } from './constant'

const displayBanner = () => {
  const pkgInfo = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'))

  console.log(`Running ${pkgInfo.name}@v${pkgInfo.version}...`)
  console.log(`Support company count: ${COMPANY.length}`)
  console.log(`Support video format file: ${VIDEO_SUFFIX.join(', ')}`)
}

export default async () => {
  displayBanner()
  const filenames = fs.readdirSync(targetPath.get())
    .filter(item => !/^~\.@/.test(item))
    .filter(suffixFilterFn)
    .filter(companyFilterFn)
    .filter(item => fs.statSync(item).isFile())
    .sort()
  const processQueue = handler(filenames)
  for await (const item of processQueue) {
    await action(item)
  }
  console.log('End')
}
