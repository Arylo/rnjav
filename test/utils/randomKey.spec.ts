import test from 'ava'
import randomKey from './randomKey'

test('default length random Key', (t) => {
  t.is(randomKey().length, 32)
})

test('16 length random Key', (t) => {
  t.is(randomKey(16).length, 16)
})

test('24 length random Key', (t) => {
  t.is(randomKey(24).length, 24)
})

test('32 length random Key', (t) => {
  t.is(randomKey(32).length, 32)
})
