module.exports.login = async function(req, res, next){
    try {
        res.send(undefined.Id);
    } catch (error) {
        next(error);
    }
}

module.exports.register = async function(req, res){
    try {
        res.send({});
    } catch (error) {
        nextTick(error);
    }
}