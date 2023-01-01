import test from 'ava'
import genTestFolder from '../../test/utils/genTestFolder'
import randomKey from '../../test/utils/randomKey'
import findUp from './findUp'

test('return undefined when the find not exist', (t) => {
  const filename = `${Date.now()}`
  t.is(findUp(filename), undefined)
})

test('find up base path when found the target folder', (t) => {
  const folderName = randomKey()
  const targetPath = genTestFolder({ folder: folderName })
  t.is(findUp(folderName, { cwd: targetPath }), targetPath)
})

test('find up base path when found the target folders', (t) => {
  const folderNames = [randomKey(), randomKey()]
  const targetPath = genTestFolder({ folder: folderNames })
  t.is(findUp(folderNames, { cwd: targetPath }), targetPath)
})

test('find up base path when found the target file', (t) => {
  const fileName = randomKey()
  const targetPath = genTestFolder({ file: fileName })
  t.is(findUp(fileName, { cwd: targetPath }), targetPath)
})

test('find up base path when found the target files', (t) => {
  const fileNames = [randomKey(), randomKey()]
  const targetPath = genTestFolder({ file: fileNames })
  t.is(findUp(fileNames, { cwd: targetPath }), targetPath)
})
