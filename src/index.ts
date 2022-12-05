import fs from 'fs'
import suffixFilterFn from './filters/suffix'
import companyFilterFn from './filters/company'
import targetPath from './utils/targetPath'
import handler from './handler'
import action from './action'
import pkgInfo from '../package.json'

export default async () => {
  console.log(`Running ${pkgInfo.name}@v${pkgInfo.version}...`)
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
}
