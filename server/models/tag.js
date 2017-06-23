/**
 * Created by yotam on 21/06/2017.
 */
var DAO = require('./../services/data-access-service');
var tagModel = DAO.con.model('tags', {
});
module.exports = tagModel;