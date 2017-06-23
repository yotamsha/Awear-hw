/**
 * Created by yotam on 21/06/2017.
 */
var DAO = require('./../services/data-access-service');
var geoLocationsModel = DAO.con.model('geos', {
});
module.exports = geoLocationsModel;