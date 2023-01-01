import test from 'ava'
import { getPkgPath } from './displayBanner'

test('get package.json path', (t) => {
  const pkgPath = getPkgPath()
  t.true(typeof pkgPath === 'string')
  pkgPath && t.true(pkgPath.length > 0)
  t.plan(2)
})
