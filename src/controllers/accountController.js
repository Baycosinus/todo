const db = require('../services/db/dbContext');
const jwt = require('../middlewares/auth/index');
const { errCode } = require('../middlewares/error');

module.exports.login = async function (req, res, next) {
    try {
        var user = await db.readOne('User', { username: req.body.username }, next);

        if (user === null || user.password != req.body.password) {
            //res.status(401).send({ message: 'Invalid credentials' });
            throw new Error(errCode.USER_NOT_FOUND);
        }
        else {
            var t = jwt.createJwt(user);
            res.status(200).send({ token: t});
        }
    } catch (error) {
        next(error);
    }
}

module.exports.register = async function (req, res, next) {
    try {
        var user = await db.readOne('User', { username: req.body.username }, next);

        if (user != null) { throw new Error(errCode.USER_ALREADY_EXISTS); }

        var newUser = { 
            username: req.body.username,
            password: req.body.password
        };

        var result = await db.insert('User', newUser);
        
        if (result == null){
            throw new Error(errCode.SERVER_ERROR);
        }

        var t = jwt.createJwt(result);
        res.status(200).send({ token: t });
    } catch (error) {
        next(error);
    }
}