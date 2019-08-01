const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const adminpanel = require('./routes/admin-panel');
const clientpanel = require('./routes/client-panel');
const register = require('./routes/register');
const config = require('config');
const error = require('./middleware/error');
require('express-async-errors');

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect("mongodb://localhost/oqypqal", { useNewUrlParser: true })
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log('Error', err));

app.use(Express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-auth-token");
    res.header("Access-Control-Expose-Headers", "x-auth-token");
    next();
});

app.use('/admin-panel', adminpanel);
app.use('/', clientpanel);
app.use('/register', register);
app.use(error);

const port = process.env.port || 3001;
app.listen(port, () => console.log('Listenging on port', port));

