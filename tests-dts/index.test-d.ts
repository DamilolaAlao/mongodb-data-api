import type { Document } from 'mongodb'
import { createDB } from '../src'
import { describe, expectError, expectType, IsAny, IsUnion } from './type'

interface FooString {
  foo: string
}

interface BarString {
  bar: string
}

describe('Class creator', () => {
  const db = new createDB()
  // @ts-expect-error
  expectError(db.createModel())
})

describe('action type', async () => {
  const db = new createDB()
  const fooModel = db.createModel('foo')
  const result = await fooModel.findOne()
  if (result.document) {
    expectType<Document>(result.document)
  }

  const result2 = await fooModel.findOne<BarString>({
    filter: { name: 'Surmon' }
  })
  expectType<IsAny<typeof result2.document>>(false)
  expectType<IsUnion<typeof result2.document>>(true)
  expectType<BarString | null>(result2.document)

  const result3 = await fooModel.findOne<FooString>()
  expectType<IsAny<typeof result3.document>>(false)
  expectType<FooString | null>(result3.document)

  const result4 = await fooModel.findOne<FooString>({ filter: { bar: '' } })
  expectType<IsAny<typeof result4.document>>(false)
  expectType<FooString | null>(result4.document)
})

// https://github.com/surmon-china/mongodb-data-api/pull/3/files @maxfi
describe('actions', async () => {
  interface Person {
    _id: string
    name: string
    age: number
  }

  interface Car {
    _id: string
    make: string
  }

  const db = new createDB()
  const testCollection = db.createModel('test')
  const carCollection = db.createModel<Car>('car')
  const personCollection = db.createModel<Person>('person')

  testCollection
    .findOne({ filter: { make: 'test' } })
    .then((result) => expectType<{ document: Document | null }>(result))

  carCollection
    .findOne({ filter: { make: 'test' } })
    .then((result) => expectType<{ document: Car | null }>(result))

  personCollection
    .findOne<Person>({ filter: { name: 'person' } })
    .then((result) => expectType<{ document: Person | null }>(result))

  personCollection
    .findOne<Person>({ filter: { _id: '123' }, projection: {} })
    .then((result) => expectType<{ document: Person | null }>(result))

  personCollection
    .find<Person>({ filter: { age: { $gt: 30 } }, projection: { _id: 1 } })
    .then((result) => expectType<{ documents: Person[] }>(result))

  personCollection
    .insertOne({ document: { _id: '123', name: 'John', age: 30 } })
    .then((result) => expectType<{ insertedId: string }>(result))

  personCollection
    .insertMany({ documents: [{ _id: '123', name: 'John', age: 30 }] })
    .then((result) => expectType<{ insertedIds: string[] }>(result))

  personCollection
    .updateOne({ filter: { _id: '123' }, update: { $set: { name: 'John' } } })
    .then((result) =>
      expectType<{
        matchedCount: number
        modifiedCount: number
        upsertedId?: string
      }>(result)
    )

  personCollection
    .updateMany({ filter: { age: { $gt: 30 } }, update: { $set: { name: 'John' } } })
    .then((result) =>
      expectType<{
        matchedCount: number
        modifiedCount: number
        upsertedId?: string
      }>(result)
    )

  personCollection
    .replaceOne({
      filter: { _id: '123' },
      replacement: { _id: '123', name: 'John', age: 30 }
    })
    .then((result) =>
      expectType<{ matchedCount: number; modifiedCount: number; upsertedId?: string }>(
        result
      )
    )
})
