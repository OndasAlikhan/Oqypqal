//This function is created in order to not to write Try_Catch blocks all over the place.
//it is used to wrap handlers and shorten overall code length.
//Used for async await style code.

// It takes the router handler function reference as a parameter.
// Wraps it into Try_Catch block and returns it.
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res);
        }
        catch (ex) {
            next(ex);
        }
    };
}