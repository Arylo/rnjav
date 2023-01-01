import test from 'ava'
import getCliParams from './getCliParams'

test('Support help option', (t) => {
  const parmas = getCliParams(['--help'])
  t.true(parmas.help)
})

test('Support shore help option', (t) => {
  const parmas = getCliParams(['-h'])
  t.true(parmas.h)
})

test('Support alias help option #0', (t) => {
  const parmas = getCliParams(['--help'])
  t.true(parmas.help)
  t.true(parmas.h)
})

test('Support alias help option #1', (t) => {
  const parmas = getCliParams(['-h'])
  t.true(parmas.help)
  t.true(parmas.h)
})

test('Support auto option', (t) => {
  const parmas = getCliParams(['--yes'])
  t.true(parmas.yes)
})

test('Support shore auto option', (t) => {
  const parmas = getCliParams(['-y'])
  t.true(parmas.y)
})

test('Support alias auto option #0', (t) => {
  const parmas = getCliParams(['--yes'])
  t.true(parmas.yes)
  t.true(parmas.y)
})

test('Support alias auto option #1', (t) => {
  const parmas = getCliParams(['-y'])
  t.true(parmas.yes)
  t.true(parmas.y)
})

test('Support tail args', (t) => {
  const parmas = getCliParams(['test', '--', 'abc'])
  t.deepEqual(parmas['--'], ['abc'])
})
