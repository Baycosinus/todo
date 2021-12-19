function handleErrors(app){
    app.use((err, req, res, next) => {
        console.log("hehehe");
        res.status(500).send({
            Message: err.message,
            Stacktrace: err.stack
        });
    });
}

module.exports = handleErrors;