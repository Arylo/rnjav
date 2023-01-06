import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import findUp from '../src/utils/findUp'
import getCliParams from '../src/utils/getCliParams'

const name = 'static/company.json'
const basePath = findUp(name, { cwd: __dirname })

if (basePath) {
  const filepath = path.resolve(basePath, name)
  const content: string[] = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
  const oldSize = content.length
  const args = getCliParams()['--']
  args.forEach((c, index) => {
    const exist = content.includes(c.toUpperCase())
    const status = !exist ? chalk.green('PASS') : chalk.blue('SKIP')
    console.log(`${displayNumber(index + 1, args.length)} ${status} Add Company \`${c}\``)
    !exist && content.push(c)
  })
  const newContent = [...new Set(content.map(c => c.toUpperCase()))]
  console.log(`Old Size: ${oldSize}`)
  console.log(`New Size: ${newContent.length}`)
  fs.writeFileSync(filepath, JSON.stringify(newContent, null, 2), 'utf-8')
}

function displayNumber(current: number, total: number) {
  const { length } = total.toString()
  let text = current.toString()
  while (text.length !== length) {
    text = `0${text}`
  }
  return `[${text}/${total}]`
}
