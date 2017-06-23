/**
 * Created by yotam on 21/06/2017.
 */
const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
// tell the app to look for static files in these directories
app.use(express.static(path.join(__dirname, './../client')));
routes.init(app);
// start the server
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000 or http://127.0.0.1:8000');
});
