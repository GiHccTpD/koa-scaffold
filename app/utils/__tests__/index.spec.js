'use strict'

const { compareArr } = require('../index')

function sum(a, b) {
  return a + b
}

describe('test util', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })
  it('test compareArr', () => {
    const diff = compareArr([1, 2, 3, 4], [1, 2, 3, 4])
    expect(diff).toEqual(true)
  })
})
