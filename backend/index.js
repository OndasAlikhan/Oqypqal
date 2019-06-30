//
const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const adminpanel = require('./routes/admin-panel');

app.use(Express.json());
app.use('/admin-panel', adminpanel);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
const port = process.env.port || 3001;
app.listen(port, () => console.log('Listenging on port', port));

