const db = require('../services/db/dbContext');
var jwt = require('../middlewares/auth/index');
const { errCode } = require('../middlewares/error');
const ObjectID = require('mongodb').ObjectID;

module.exports.list = async function (req, res, next) {
    try {
        var user = jwt.validateJwt(req);

        if (user == null) {
            throw new Error(errCode.AUTH);
        }

        var result = await db.read('ToDo', { userId: new ObjectID(user.userId) }, next);

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.get = async function (req, res, next) {
    try {
        var user = jwt.validateJwt(req);

        if (user == null) {
            throw new Error(errCode.AUTH);
        }

        var uId = new ObjectID(user.userId);
        var oId = new ObjectID(req.params.id);
        var result = await db.readOne('ToDo', { userId: uId, _id: oId}, next);

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.update = async function (req, res, next) {
    try {
        var user = jwt.validateJwt(req);

        if (user == null) {
            throw new Error(errCode.AUTH);
        }

        req.body._id = new ObjectID(req.body._id);
        var result = await db.update('ToDo', req.body, next);

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }

}

module.exports.create = async function (req, res, next) {
    try {
        var user = jwt.validateJwt(req);

        if (user == null) {
            throw new Error(errCode.AUTH);
        }

        req.body.userId = new ObjectID(user.userId);
        var result = await db.insert('ToDo', req.body, next);

        if (result == null) {
            throw new Error(errCode.SERVER_ERROR);
        }

        res.status(200).send();
    } catch (error) {
        next(error);
    }
}