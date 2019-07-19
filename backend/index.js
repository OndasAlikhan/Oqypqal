//
const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const adminpanel = require('./routes/admin-panel');
const clientpanel = require('./routes/client-panel');

app.use(Express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use('/admin-panel', adminpanel);
app.use('/', clientpanel);

const port = process.env.port || 3001;
app.listen(port, () => console.log('Listenging on port', port));

