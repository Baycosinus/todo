const jwt = require('jsonwebtoken');

function createJwt(user) {
    return jwt.sign({
        userId: user._id.toString(),
        username: user.username,
        date: new Date()
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
}

function validateJwt(req){
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    var apiUser = null;
    if(!token) {
        return null;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return false;
        apiUser = user;
    });

    return apiUser;
}

module.exports = { createJwt, validateJwt };