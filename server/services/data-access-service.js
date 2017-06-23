/**
 * Created by yotam on 21/06/2017.
 */

var mongoose = require('mongoose'); // mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://read:root@ds129342.mlab.com:29342/awear');     // connect to mongoDB database on modulus.io

var DAO = {
    con: mongoose
};
module.exports = DAO;