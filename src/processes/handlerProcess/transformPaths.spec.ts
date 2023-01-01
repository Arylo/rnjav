import path from 'path'
import test from 'ava'
import genTestFolder from '../../../test/utils/genTestFolder'
import transform from './transformPaths'

test('transform file path', (t) => {
  const testPath = genTestFolder({ file: 'SSIS123.mp4' })
  const paths = transform([testPath])
  t.deepEqual(paths, [
    path.resolve(testPath, 'SSIS123.mp4'),
  ])
})

test('transform file path using filepath', (t) => {
  const testPath = genTestFolder({ file: 'SSIS123.mp4' })
  const paths = transform([path.resolve(testPath, 'SSIS123.mp4')])
  t.deepEqual(paths, [
    path.resolve(testPath, 'SSIS123.mp4'),
  ])
})

test('transform file paths', (t) => {
  const testPath = genTestFolder({
    file: ['SSIS123.mp4', 'SSNI123.mkv'],
  })
  const paths = transform([testPath])
  t.deepEqual(paths, [
    path.resolve(testPath, 'SSIS123.mp4'),
    path.resolve(testPath, 'SSNI123.mkv'),
  ])
})

test('transform file paths with diff folder', (t) => {
  const testPaths = [
    genTestFolder({ file: 'SSIS123.mp4' }),
    genTestFolder({ file: 'SSNI123.mkv' }),
  ]
  const paths = transform(testPaths)
  t.deepEqual(paths, [
    path.resolve(testPaths[0], 'SSIS123.mp4'),
    path.resolve(testPaths[1], 'SSNI123.mkv'),
  ])
})

test('transform file paths with sub folder', (t) => {
  const testPath = genTestFolder({ file: 'test/SSIS123.mp4' })
  const paths = transform([testPath, path.resolve(testPath, 'test')])
  t.deepEqual(paths, [
    path.resolve(testPath, 'test/SSIS123.mp4'),
  ])
})
