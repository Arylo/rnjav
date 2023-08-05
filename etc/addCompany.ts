import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import getCliParams from '../src/utils/getCliParams'
import { cd, ls } from '@js-sh/js-sh'

const TARGET_FILE_NAME = 'static/company.json'

const newList: string[] = []
const args = getCliParams()['--']
args.forEach((arg) => {
  newList.push(...arg.split(/,/).filter(Boolean))
})
if (!newList.length) process.exit(0)

cd(path.resolve(__dirname, '..'))

const targetFiles = ls(TARGET_FILE_NAME)
if (!targetFiles.length) process.exit(0)
const targetFile = targetFiles[0]
const content: string[] = JSON.parse(fs.readFileSync(targetFile, 'utf-8'))
const oldSize = content.length
newList.forEach((c, index) => {
  const exist = content.includes(c.toUpperCase())
  const status = !exist ? chalk.green('PASS') : chalk.blue('SKIP')
  console.log(`${displayNumber(index + 1, args.length)} ${status} Add Company \`${c}\``)
  content.push(c.toUpperCase())
})
const newContent = [...new Set(content)]
console.log(`Old Size: ${oldSize}`)
console.log(`New Size: ${newContent.length}`)
fs.writeFileSync(targetFile, JSON.stringify(newContent, null, 2), 'utf-8')

function displayNumber(current: number, total: number) {
  const { length } = total.toString()
  let text = current.toString()
  while (text.length !== length) {
    text = `0${text}`
  }
  return `[${text}/${total}]`
}
