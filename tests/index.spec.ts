import { createDB } from '../src'

test('<type> should be function type', () => {
  const db = new createDB()

  const hooksTargetType = 'function'
  expect(typeof db.createModel).toBe(hooksTargetType)
})
