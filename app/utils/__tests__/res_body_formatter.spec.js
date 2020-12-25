'use strict'

const f = require('../res_body_formatter')

describe('测试返回body的格式化函数', () => {
  it('只传meta的code', () => {
    const input = {
      meta: {
        code: 200
      }
    }

    const output = f(input)

    expect(output).toHaveProperty('meta.code', 200)
    expect(output).toHaveProperty('meta.msg', 'ok')
    expect(output).toHaveProperty('meta.details', [])
    expect(output).toHaveProperty('data', {})
  })
  it('只传data', () => {
    const id = '1020422337001196579'
    const input = {
      data: {
        id
      }
    }

    const output = f(input)

    expect(output).toHaveProperty('meta.code', 200)
    expect(output).toHaveProperty('meta.msg', 'ok')
    expect(output).toHaveProperty('meta.details', [])
    expect(output).toHaveProperty('data.id', id)
  })

  it('什么都不传', () => {
    const input = {}

    const output = f(input)

    expect(output).toHaveProperty('meta.code', 200)
    expect(output).toHaveProperty('meta.msg', 'ok')
    expect(output).toHaveProperty('meta.details', [])
    expect(output).toHaveProperty('data', {})
  })
})
