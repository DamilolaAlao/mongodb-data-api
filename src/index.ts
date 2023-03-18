import _axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { Filter, FindOptions, Sort, UpdateFilter, Document } from 'mongodb'

// https://github.com/surmon-china/mongodb-data-api/pull/3/files @maxfi
type Projection = FindOptions['projection']

// https://github.com/surmon-china/mongodb-data-api/pull/4/files @maxfi
type NoInfer<A extends any> = [A][A extends any ? 0 : never]

type AnyKeys<T> = { [P in keyof T]?: T[P] | any }

let baseurl: string = 'http://localhost:8080'

const config = {
  apiKey: ''
}

// https://docs.atlas.mongodb.com/api/data-api-resources/#base-url
const getActionUrl = (action: string) => {
  return `${baseurl}/action/${action}`
}

type ExtendBaseParams<T> = BaseParams & T
interface BaseParams {
  dataSource?: string
  database?: string
  collection?: string
  [key: string]: any
}

const baseParams = {
  dataSource: 'Cluster0',
  database: 'untitledtesty2',
  collection: ''
}

class MongoDBDataAPI<InnerDoc = Document> {
  #baseParams: BaseParams = baseParams
  #axios: AxiosInstance = _axios.create()

  /**
   * Execute a API action.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/
   */
  #action<Result = unknown>(
    name: string,
    params: BaseParams = {},
    axiosConfig?: AxiosRequestConfig
  ): Promise<Result> {
    const mergedParams = {
      ...this.#baseParams,
      ...params
    }

    if (!mergedParams.dataSource || !mergedParams.database || !mergedParams.collection) {
      return Promise.reject('Invalid params: dataSource, database, collection')
    }

    return this.#axios({
      method: 'post',
      data: JSON.stringify(mergedParams),
      url: getActionUrl(name),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        Authorization: 'Bearer ' + config?.apiKey
      },
      ...axiosConfig
    })
      .then((response) => {
        return response.data
      })
      .catch((error) => {
        console.log(error)
        // https://docs.atlas.mongodb.com/api/data-api-resources/#error-codes
        return Promise.reject(error.toJSON())
      })
  }

  /**
   * Find a Single Document.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-a-single-document
   */
  public findOne<D = InnerDoc, T = NoInfer<D>>(
    params?: ExtendBaseParams<{
      filter?: Filter<T>
      projection?: Projection
    }>
  ) {
    return this.#action<{ document: (D & { _id: string }) | null }>('findOne', params)
  }

  /**
   * Find Multiple Documents.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-multiple-documents
   */
  public find<D = InnerDoc, T = NoInfer<D>>(
    params?: ExtendBaseParams<{
      filter?: Filter<T>
      projection?: Projection
      sort?: Sort
      limit?: number
      skip?: number
    }>
  ) {
    return this.#action<{ documents: Array<D & { _id: string }> }>('find', params)
  }

  /**
   * Insert a Single Document.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-a-single-document
   */
  public insertOne<D = InnerDoc, T = NoInfer<D>>(
    params: ExtendBaseParams<{ document: AnyKeys<T> | Document }>
  ) {
    return this.#action<{ insertedId: string }>('insertOne', params)
  }

  /**
   * Insert Multiple Documents.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-multiple-documents
   */
  public insertMany<D = InnerDoc, T = NoInfer<D>>(
    params: ExtendBaseParams<{ documents: Array<AnyKeys<T> | Document> }>
  ) {
    return this.#action<{ insertedIds: Array<string> }>('insertMany', params)
  }

  /**
   * Update a Single Document.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-a-single-document
   */
  public updateOne<D = InnerDoc, T = NoInfer<D>>(
    params: ExtendBaseParams<{
      filter: Filter<T>
      update: UpdateFilter<T>
      upsert?: boolean
    }>
  ) {
    return this.#action<{
      matchedCount: number
      modifiedCount: number
      upsertedId?: string
    }>('updateOne', params)
  }

  /**
   * Update Multiple Documents.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-multiple-documents
   */
  public updateMany<D = InnerDoc, T = NoInfer<D>>(
    params: ExtendBaseParams<{
      filter: Filter<T>
      update: UpdateFilter<T>
      upsert?: boolean
    }>
  ) {
    return this.#action<{
      matchedCount: number
      modifiedCount: number
      upsertedId?: string
    }>('updateMany', params)
  }

  /**
   * Replace a Single Document.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#replace-a-single-document
   */
  public replaceOne<D = InnerDoc, T = NoInfer<D>>(
    params: ExtendBaseParams<{
      filter: Filter<T>
      replacement: any
      upsert?: boolean
    }>
  ) {
    return this.#action<{
      matchedCount: number
      modifiedCount: number
      upsertedId?: string
    }>('replaceOne', params)
  }

  /**
   * Delete a Single Document.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-a-single-document
   */
  public deleteOne<D = InnerDoc, T = NoInfer<D>>(
    params: ExtendBaseParams<{ filter: Filter<T> }>
  ) {
    return this.#action<{ deletedCount: number }>('deleteOne', params)
  }

  /**
   * Delete Multiple Documents.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-multiple-documents
   */
  public deleteMany<D = InnerDoc, T = NoInfer<D>>(
    params: ExtendBaseParams<{ filter: Filter<T> }>
  ) {
    return this.#action<{ deletedCount: number }>('deleteMany', params)
  }

  /**
   * Run an Aggregation Pipeline.
   * @link https://docs.atlas.mongodb.com/api/data-api-resources/#run-an-aggregation-pipeline
   */
  public aggregate<T extends Array<any>>(
    params: ExtendBaseParams<{ pipeline: Array<Document> }>
  ) {
    return this.#action<{ documents: T }>('aggregate', params)
  }
}

export class createDB {
  constructor(url?: string, apiKey?: string) {
    // Constructor
    if (apiKey) {
      config.apiKey = apiKey
    } else {
      baseurl = url || `${baseurl}/anon`
    }
  }

  public createModel<Doc = any>(modelname: string) {
    if (!modelname) {
      throw new Error('Invalid Model Name')
    }
    baseParams.collection = modelname
    return new MongoDBDataAPI<Doc>()
  }
}
