const { response } = require('express');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

module.exports.read = async function (collection, query, next) {
    var response = null;
    const db = await MongoClient.connect(process.env.MONGO_URI).catch(err => { next(err); });

    try {
        var dbo = db.db(process.env.MONGO_DB);
        var c = dbo.collection(collection);

        response = await c.find(query).toArray();

    } catch (error) {
        throw new Error(error);
    }
    return response;
}

module.exports.readOne = async function (collection, query, next) {
    var response = null;
    const db = await MongoClient.connect(process.env.MONGO_URI).catch(err => { next(err); });

    try {
        var dbo = db.db(process.env.MONGO_DB);
        var c = dbo.collection(collection);

        response = await c.findOne(query);

    } catch (error) {
        throw new Error(error);
    }
    return response;
}

module.exports.insert = async function (collection, obj) {
    var response = null;
    const db = await MongoClient.connect(process.env.MONGO_URI).catch(err => { next(err); });

    try {
        var dbo = db.db(process.env.MONGO_DB);
        var c = dbo.collection(collection);

        var result = await c.insertOne(obj);
        if (result.acknowledged) {
            response = await c.findOne({ _id: result.insertedId });
        }
    } catch (error) {
        throw new Error(error);
    }
    return response;
}

module.exports.update = async function (collection, obj) {
    var response = null

    const db = await MongoClient.connect(process.env.MONGO_URI).catch(err => { next(err); });

    try {
        var dbo = db.db(process.env.MONGO_DB);
        var c = dbo.collection(collection);

        var result = await c.updateOne({ _id: obj._id }, { $set: { Text: obj.Text, Progress: obj.Progress, Status: obj.Status } });
        if (result.acknowledged) {
            response = await c.findOne({ _id: result.insertedId });
        }
    } catch (error) {
        throw new Error(error);
    }
    return response;
}