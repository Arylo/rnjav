import test from 'ava'
import handler from './handler'

test('Default #0', (t) => {
  const filename = 'SSIS123.mp4'
  const list = [filename]
  t.deepEqual(handler(list), [{
    company: 'SSIS',
    number: '123',
    disk: 0,
    pre: '',
    post: '',
    keyword: 'SSIS123',
    index: 0,
    base: 'SSIS123',
    ext: 'mp4',
    raw: filename,
  }])
})

test('Default #1', (t) => {
  const filename = 'SSIS-123.mp4'
  const list = [filename]
  t.deepEqual(handler(list), [{
    company: 'SSIS',
    number: '123',
    disk: 0,
    pre: '',
    post: '',
    keyword: 'SSIS-123',
    index: 0,
    base: 'SSIS-123',
    ext: 'mp4',
    raw: filename,
  }])
})

test('with disk number #0', (t) => {
  const filename = 'SSIS123-1.mp4'
  const list = [filename]
  t.deepEqual(handler(list), [{
    company: 'SSIS',
    number: '123',
    disk: 1,
    pre: '',
    post: '',
    keyword: 'SSIS123-1',
    index: 0,
    base: 'SSIS123-1',
    ext: 'mp4',
    raw: filename,
  }])
})

test('with disk number #1', (t) => {
  const filename = 'SSIS123-CD1.mp4'
  const list = [filename]
  t.deepEqual(handler(list), [{
    company: 'SSIS',
    number: '123',
    disk: 1,
    pre: '',
    post: '',
    keyword: 'SSIS123-CD1',
    index: 0,
    base: 'SSIS123-CD1',
    ext: 'mp4',
    raw: filename,
  }])
})

test('with disk word #0', (t) => {
  const filename = 'SSIS123A.mp4'
  const list = [filename]
  t.deepEqual(handler(list), [{
    company: 'SSIS',
    number: '123',
    disk: 1,
    pre: '',
    post: '',
    keyword: 'SSIS123A',
    index: 0,
    base: 'SSIS123A',
    ext: 'mp4',
    raw: filename,
  }])
})

test('with disk word #1', (t) => {
  const filename = 'SSIS123-C.mp4'
  const list = [filename]
  t.deepEqual(handler(list), [{
    company: 'SSIS',
    number: '123',
    disk: 3,
    pre: '',
    post: '',
    keyword: 'SSIS123-C',
    index: 0,
    base: 'SSIS123-C',
    ext: 'mp4',
    raw: filename,
  }])
})

test('with url #1', (t) => {
  const filename = 'abc.org@SSIS123.mp4'
  const list = [filename]
  t.deepEqual(handler(list), [{
    company: 'SSIS',
    number: '123',
    disk: 0,
    pre: 'abc.org@',
    post: '',
    keyword: 'SSIS123',
    index: 8,
    base: 'abc.org@SSIS123',
    ext: 'mp4',
    raw: filename,
  }])
})

