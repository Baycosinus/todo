const errCode = {
    AUTH: 1401,
    USER_ALREADY_EXISTS: 1402,
    USER_NOT_FOUND: 1403,
    BAD_REQUEST: 1400,
    SERVER_ERROR: 1500
};

function handleErrors(app) {
    app.use((err, req, res, next) => {
        error = resolve(err);
        res.status(error.statusCode).send({
            Message: error.message,
            Stacktrace: error.statusCode == 500 ? error.stack : null
        });
    });
}

function resolve(err) {
    switch(parseInt(err.message)) {
        case errCode.AUTH:
            err.message = 'Authorization failed.';
            err.statusCode = 401;
            break;
        case errCode.USER_ALREADY_EXISTS:
            err.message = 'User already exists';
            err.statusCode = 400;
            break;
        case errCode.USER_NOT_FOUND:
            err.message = 'User not found';
            err.statusCode = 400;
            break;
        case errCode.BAD_REQUEST:
            err.message = 'Bad request';
            err.statusCode = 400;
            break;
        case errCode.SERVER_ERROR:
            err.message = 'Server error';
            err.statusCode = 500;
            break;
    }
    return err;
}

module.exports = { handleErrors, errCode };