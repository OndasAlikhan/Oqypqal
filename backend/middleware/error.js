
//this is the last middleware to which program goes if any error happened
//it is used in case that error is unknown
module.exports = function (err, req, res, next) {
    console.log(err);
    res.status(500).send('Something failed');
}