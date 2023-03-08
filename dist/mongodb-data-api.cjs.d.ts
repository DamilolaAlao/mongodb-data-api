import { Filter, FindOptions, Sort, UpdateFilter, Document } from 'mongodb';
type Projection = FindOptions['projection'];
type NoInfer<A extends any> = [A][A extends any ? 0 : never];
type AnyKeys<T> = {
    [P in keyof T]?: T[P] | any;
};
type ExtendBaseParams<T> = BaseParams & T;
interface BaseParams {
    dataSource?: string;
    database?: string;
    collection?: string;
    [key: string]: any;
}
declare class MongoDBDataAPI<InnerDoc = Document> {
    #private;
    /**
     * Find a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-a-single-document
     */
    /**
     * Find a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-a-single-document
     */
    findOne<D = InnerDoc, T = NoInfer<D>>(params?: ExtendBaseParams<{
        filter?: Filter<T>;
        projection?: Projection;
    }>): Promise<{
        document: D | null;
    }>;
    /**
     * Find Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-multiple-documents
     */
    /**
     * Find Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-multiple-documents
     */
    find<D = InnerDoc, T = NoInfer<D>>(params?: ExtendBaseParams<{
        filter?: Filter<T>;
        projection?: Projection;
        sort?: Sort;
        limit?: number;
        skip?: number;
    }>): Promise<{
        documents: Array<D>;
    }>;
    /**
     * Insert a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-a-single-document
     */
    /**
     * Insert a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-a-single-document
     */
    insertOne<D = InnerDoc, T = NoInfer<D>>(params: ExtendBaseParams<{
        document: AnyKeys<T> | Document;
    }>): Promise<{
        insertedId: string;
    }>;
    /**
     * Insert Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-multiple-documents
     */
    /**
     * Insert Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-multiple-documents
     */
    insertMany<D = InnerDoc, T = NoInfer<D>>(params: ExtendBaseParams<{
        documents: Array<AnyKeys<T> | Document>;
    }>): Promise<{
        insertedIds: Array<string>;
    }>;
    /**
     * Update a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-a-single-document
     */
    /**
     * Update a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-a-single-document
     */
    updateOne<D = InnerDoc, T = NoInfer<D>>(params: ExtendBaseParams<{
        filter: Filter<T>;
        update: UpdateFilter<T>;
        upsert?: boolean;
    }>): Promise<{
        matchedCount: number;
        modifiedCount: number;
        upsertedId?: string | undefined;
    }>;
    /**
     * Update Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-multiple-documents
     */
    /**
     * Update Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-multiple-documents
     */
    updateMany<D = InnerDoc, T = NoInfer<D>>(params: ExtendBaseParams<{
        filter: Filter<T>;
        update: UpdateFilter<T>;
        upsert?: boolean;
    }>): Promise<{
        matchedCount: number;
        modifiedCount: number;
        upsertedId?: string | undefined;
    }>;
    /**
     * Replace a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#replace-a-single-document
     */
    /**
     * Replace a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#replace-a-single-document
     */
    replaceOne<D = InnerDoc, T = NoInfer<D>>(params: ExtendBaseParams<{
        filter: Filter<T>;
        replacement: any;
        upsert?: boolean;
    }>): Promise<{
        matchedCount: number;
        modifiedCount: number;
        upsertedId?: string | undefined;
    }>;
    /**
     * Delete a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-a-single-document
     */
    /**
     * Delete a Single Document.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-a-single-document
     */
    deleteOne<D = InnerDoc, T = NoInfer<D>>(params: ExtendBaseParams<{
        filter: Filter<T>;
    }>): Promise<{
        deletedCount: number;
    }>;
    /**
     * Delete Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-multiple-documents
     */
    /**
     * Delete Multiple Documents.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-multiple-documents
     */
    deleteMany<D = InnerDoc, T = NoInfer<D>>(params: ExtendBaseParams<{
        filter: Filter<T>;
    }>): Promise<{
        deletedCount: number;
    }>;
    /**
     * Run an Aggregation Pipeline.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#run-an-aggregation-pipeline
     */
    /**
     * Run an Aggregation Pipeline.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/#run-an-aggregation-pipeline
     */
    aggregate<T extends Array<any>>(params: ExtendBaseParams<{
        pipeline: Array<Document>;
    }>): Promise<{
        documents: T;
    }>;
}
declare class createDB {
    constructor(apiKey?: string, url?: string);
    createModel<Doc = any>(modelname: string): MongoDBDataAPI<Doc>;
}
export { createDB };
