/*!
* MongodbDataApi v0.2.1
* Copyright (c) Surmon. All rights reserved.
* Released under the MIT License.
* Surmon
*/
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _axios=require('axios');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var _axios__default=/*#__PURE__*/_interopDefaultLegacy(_axios);/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) { throw new TypeError("Private accessor was defined without a getter"); }
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) { throw new TypeError("Cannot read private member from an object whose class did not declare it"); }
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}var _MongoDBDataAPI_instances, _MongoDBDataAPI_baseParams, _MongoDBDataAPI_axios, _MongoDBDataAPI_action;
var baseurl = 'http://localhost:8080';
var config = {
    apiKey: ''
};
// https://docs.atlas.mongodb.com/api/data-api-resources/#base-url
var getActionUrl = function (action) {
    return (baseurl + "/action/" + action);
};
var baseParams = {
    dataSource: 'Cluster0',
    database: 'untitledtesty2',
    collection: ''
};
var MongoDBDataAPI = function MongoDBDataAPI() {
    _MongoDBDataAPI_instances.add(this);
    _MongoDBDataAPI_baseParams.set(this, baseParams);
    _MongoDBDataAPI_axios.set(this, _axios__default["default"].create()
    /**
     * Execute a API action.
     * @link https://docs.atlas.mongodb.com/api/data-api-resources/
     */
    );
};
/**
 * Find a Single Document.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-a-single-document
 */
MongoDBDataAPI.prototype.findOne = function findOne (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'findOne', params);
};
/**
 * Find Multiple Documents.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#find-multiple-documents
 */
MongoDBDataAPI.prototype.find = function find (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'find', params);
};
/**
 * Insert a Single Document.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-a-single-document
 */
MongoDBDataAPI.prototype.insertOne = function insertOne (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'insertOne', params);
};
/**
 * Insert Multiple Documents.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#insert-multiple-documents
 */
MongoDBDataAPI.prototype.insertMany = function insertMany (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'insertMany', params);
};
/**
 * Update a Single Document.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-a-single-document
 */
MongoDBDataAPI.prototype.updateOne = function updateOne (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'updateOne', params);
};
/**
 * Update Multiple Documents.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#update-multiple-documents
 */
MongoDBDataAPI.prototype.updateMany = function updateMany (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'updateMany', params);
};
/**
 * Replace a Single Document.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#replace-a-single-document
 */
MongoDBDataAPI.prototype.replaceOne = function replaceOne (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'replaceOne', params);
};
/**
 * Delete a Single Document.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-a-single-document
 */
MongoDBDataAPI.prototype.deleteOne = function deleteOne (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'deleteOne', params);
};
/**
 * Delete Multiple Documents.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#delete-multiple-documents
 */
MongoDBDataAPI.prototype.deleteMany = function deleteMany (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'deleteMany', params);
};
/**
 * Run an Aggregation Pipeline.
 * @link https://docs.atlas.mongodb.com/api/data-api-resources/#run-an-aggregation-pipeline
 */
MongoDBDataAPI.prototype.aggregate = function aggregate (params) {
    return __classPrivateFieldGet(this, _MongoDBDataAPI_instances, "m", _MongoDBDataAPI_action).call(this, 'aggregate', params);
};
_MongoDBDataAPI_baseParams = new WeakMap(), _MongoDBDataAPI_axios = new WeakMap(), _MongoDBDataAPI_instances = new WeakSet(), _MongoDBDataAPI_action = function _MongoDBDataAPI_action(name, params, axiosConfig) {
    if ( params === void 0 ) params = {};

    var mergedParams = Object.assign(Object.assign({}, __classPrivateFieldGet(this, _MongoDBDataAPI_baseParams, "f")), params);
    if (!mergedParams.dataSource || !mergedParams.database || !mergedParams.collection) {
        return Promise.reject('Invalid params: dataSource, database, collection');
    }
    return __classPrivateFieldGet(this, _MongoDBDataAPI_axios, "f").call(this, Object.assign({ method: 'post', data: JSON.stringify(mergedParams), url: getActionUrl(name), headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            Authorization: 'Bearer ' + (config === null || config === void 0 ? void 0 : config.apiKey)
        } }, axiosConfig))
        .then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        console.log(error);
        // https://docs.atlas.mongodb.com/api/data-api-resources/#error-codes
        return Promise.reject(error.toJSON());
    });
};
var createDB = function createDB(url, apiKey) {
    // Constructor
    if (apiKey) {
        config.apiKey = apiKey;
    }
    else {
        baseurl = url || (baseurl + "/anon");
    }
};
createDB.prototype.createModel = function createModel (modelname) {
    if (!modelname) {
        throw new Error('Invalid Model Name');
    }
    baseParams.collection = modelname;
    return new MongoDBDataAPI();
};exports.createDB=createDB;