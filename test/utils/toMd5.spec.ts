import test from 'ava'
import toMd5 from './toMd5'

test('To MD5', (t) => {
  t.is(toMd5('123'), '202cb962ac59075b964b07152d234b70')
})
