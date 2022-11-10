import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { IStrust } from './types'
import targetPath from './utils/targetPath'

export const action = async (item: IStrust) => {
  const diskName = item.disk > 0 ? `-CD${item.disk}` : ''
  const targetName = `${item.company}-${item.number}${diskName}.${item.ext}`
  if (targetName === item.raw) return
  const question = [
    'Rename `',
    [
      chalk.dim(item.pre),
      chalk.white.underline(item.keyword),
      chalk.dim(item.post),
      `${chalk.white.underline(`.${item.ext}`)}`,
    ].join(''),
    '` to `',
    chalk.white(targetName),
    '` ?',
  ].join('')
  const { yes } = await inquirer.prompt([{
    type: 'confirm',
    name: 'yes',
    message: question,
    default: true,
  }])
  if (!yes) return
  fs.renameSync(
    path.resolve(targetPath.get(), item.raw),
    path.resolve(targetPath.get(), targetName),
  )
}

export default action
