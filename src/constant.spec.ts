import test from 'ava'
import { COMPANY, VIDEO_SUFFIX } from './constant'

test('company has data', (t) => {
  t.true(COMPANY.length > 0)
})

test('video suffix has data', (t) => {
  t.true(VIDEO_SUFFIX.length > 0)
})
