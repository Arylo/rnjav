import fs from 'fs'
import path from 'path'
import findUp from '../src/utils/findUp'
import getCliParams from '../src/utils/getCliParams'

const name = 'static/company.json'
const basePath = findUp(name, { cwd: __dirname })

if (basePath) {
  const filepath = path.resolve(basePath, name)
  const content: string[] = JSON.parse(fs.readFileSync(filepath, 'utf-8'))
  const oldSize = content.length
  const args = getCliParams()['--']
  for (const c of args) {
    console.log(`Add Company \`${c}\``)
    !content.includes(c) && content.push(c)
  }
  const newContent = [...new Set(content.map(c => c.toUpperCase()))]
  console.log(`Old Size: ${oldSize}`)
  console.log(`New Size: ${newContent.length}`)
  fs.writeFileSync(filepath, JSON.stringify(newContent, null, 2), 'utf-8')
}
