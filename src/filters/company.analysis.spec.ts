import os from 'os'
import path from 'path'
import test from 'ava'
import { analysis } from './company'

test('Analysis Default #0', (t) => {
  const filename = 'SSIS123.mp4'
  const filepath = path.resolve(os.tmpdir(), filename)
  t.deepEqual(analysis(filepath), {
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
    path: os.tmpdir(),
    target: 'SSIS-123.mp4',
  })
})

test('Analysis Default #1', (t) => {
  const filename = 'SSIS-123.mp4'
  const filepath = path.resolve(os.tmpdir(), filename)
  t.deepEqual(analysis(filepath), {
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
    path: os.tmpdir(),
    target: 'SSIS-123.mp4',
  })
})

test('Analysis with disk number #0', (t) => {
  const filename = 'SSIS123-1.mp4'
  const filepath = path.resolve(os.tmpdir(), filename)
  t.deepEqual(analysis(filepath), {
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
    path: os.tmpdir(),
    target: 'SSIS-123-CD1.mp4',
  })
})

test('Analysis with disk number #1', (t) => {
  const filename = 'SSIS123-CD1.mp4'
  const filepath = path.resolve(os.tmpdir(), filename)
  t.deepEqual(analysis(filepath), {
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
    path: os.tmpdir(),
    target: 'SSIS-123-CD1.mp4',
  })
})

test('Analysis with disk word #0', (t) => {
  const filename = 'SSIS123A.mp4'
  const filepath = path.resolve(os.tmpdir(), filename)
  t.deepEqual(analysis(filepath), {
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
    path: os.tmpdir(),
    target: 'SSIS-123-CD1.mp4',
  })
})

test('Analysis with disk word #1', (t) => {
  const filename = 'SSIS123-C.mp4'
  const filepath = path.resolve(os.tmpdir(), filename)
  t.deepEqual(analysis(filepath), {
    company: 'SSIS',
    number: '123',
    disk: 0,
    pre: '',
    post: '-C',
    keyword: 'SSIS123',
    index: 0,
    base: 'SSIS123-C',
    ext: 'mp4',
    raw: filename,
    path: os.tmpdir(),
    target: 'SSIS-123.mp4',
  })
})

test('Analysis with url #1', (t) => {
  const filename = 'abc.org@SSIS123.mp4'
  const filepath = path.resolve(os.tmpdir(), filename)
  t.deepEqual(analysis(filepath), {
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
    path: os.tmpdir(),
    target: 'SSIS-123.mp4',
  })
})
