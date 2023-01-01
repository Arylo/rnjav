import fs from 'fs'
import path from 'path'
import test from 'ava'
import genTestFolder from './genTestFolder'
import randomKey from './randomKey'

test('Gen one test folder', (t) => {
  const folderPath = genTestFolder()
  t.true(fs.existsSync(folderPath))
  t.true(fs.statSync(folderPath).isDirectory())
})

test('Gen two diff test folder when run function', (t) => {
  const [folderPath0, folderPath1] = [genTestFolder(), genTestFolder()]
  t.not(folderPath0, folderPath1)
})

test('Gen one sub folder under the test folder', (t) => {
  const folderName = randomKey()
  const folderPath = genTestFolder({ folder: folderName })
  t.true(fs.statSync(path.resolve(folderPath, folderName)).isDirectory())
})

test('Gen three sub folder under the test folder', (t) => {
  const folderNames = [randomKey(), randomKey(), `${randomKey()}/${randomKey()}`]
  const folderPath = genTestFolder({ folder: folderNames })
  for (const folderName of folderNames) {
    t.true(fs.statSync(path.resolve(folderPath, folderName)).isDirectory())
  }
})

test('Gen one test file', (t) => {
  const fileName = randomKey()
  const folderPath = genTestFolder({ file: fileName })
  t.true(fs.statSync(path.resolve(folderPath, fileName)).isFile())
})

test('Gen three test file under the test folder', (t) => {
  const fileNames = [randomKey(), randomKey(), `${randomKey()}/${randomKey()}`]
  const folderPath = genTestFolder({ file: fileNames })
  for (const fileName of fileNames) {
    t.true(fs.statSync(path.resolve(folderPath, fileName)).isFile())
  }
})
