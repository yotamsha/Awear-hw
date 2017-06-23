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
var port = process.env.PORT || 3000;
// start the server
app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});
