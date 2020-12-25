'use strict'

const prefix = 'retail@'

module.exports = {
  hash: {},
  string: {
    test: (key) => `${prefix}test:${key}`
  },
  set: {},
  sortedSet: {},
  bitmap: {}
}
