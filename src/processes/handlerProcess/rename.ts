import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { INewObject } from './type'
import { getCliParams } from '../../utils/getCliParams'

export const rename = async (obj: INewObject) => {
  const { list, keywordCount } = obj
  for (const item of list) {
    if (item.target === item.raw) continue
    const question = [
      'Rename `',
      [
        chalk.dim(item.pre),
        chalk.white.underline(item.keyword),
        chalk.dim(item.post),
        `${chalk.white.underline(`.${item.ext}`)}`,
      ].join(''),
      '` to `',
      chalk.white(item.target),
      '` ?',
    ].join('')
    if (keywordCount[item.target] !== 1) {
      console.log(`${chalk.green('?')} ${question} ${chalk.cyan('Skip')}`)
      console.log('These files have same target file name:')
      list
        .filter(o => o.target === item.target && o.raw !== item.raw)
        .forEach(o => console.log(' ', chalk.white.underline(o.raw)))
      continue
    }
    let { yes } = getCliParams()
    if (!yes) {
      const answeres = await inquirer.prompt([{
        type: 'confirm',
        name: 'yes',
        message: question,
        default: true,
      }])
      yes = answeres.yes
    }
    if (yes) {
      fs.renameSync(
        path.resolve(item.path, item.raw),
        path.resolve(item.path, item.target),
      )
    }
  }
}
