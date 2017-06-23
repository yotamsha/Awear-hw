/**
 * Created by yotam on 21/06/2017.
 */

var configs = require('./../config/config');
var tagDAO = require('./../models/tag');
var geoDAO = require('./../models/geo');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertUTC  (date, isUTC) {
    var MILLIS_IN_MIN = 60000;
    if (!date) {
        return null;
    }
    date = new Date(date); // in case the date is in string format.
    var localTime;
    var _userOffset = date.getTimezoneOffset() * MILLIS_IN_MIN; // [min*60000 = ms]
    if (isUTC) {
        localTime = new Date(date.getTime() + _userOffset);
    } else {
        localTime = new Date(date.getTime() - _userOffset);
    }
    return localTime;
}

function generateLocations(){
    var locations = [];
    for (var i = 1; i < 80; i++){
        var clientId = i;
        for (var j= 0; j < 24; j+=2){
            var location = {
                    "type": "Point",// 32.083368, 34.876887
                    "coordinates": [
                        (32.0 + getRandomInt(0,100) / 1000),
                        (34.8 + getRandomInt(0,100) / 1000)
                    ]
                };
            var hoursSetDate = new Date().setHours(j);
            var date = new Date(hoursSetDate).setMinutes(0);
            locations.push({time: convertUTC(new Date(date)).toISOString(),client_id : clientId, location: location});
        }
    }
    //console.log(JSON.stringify(locations));
}

function generateTags(){
    var tags = [];
    for (var i = 1; i < 80; i++){
        for (var j = 0; j < 24; j+=2){
            var clientId = i;
            var hoursSetDate = new Date().setHours(j);
            var date = new Date(hoursSetDate).setMinutes(0);
            tags.push({time: convertUTC(new Date(date)).toISOString(),client_id : clientId});
        }

    }
    console.log(JSON.stringify(tags));
}
generateLocations();
generateTags();
function _getTaggedUsers(from, to) {
    console.log("Retrieving all clients with tags in the given time range");

    return new Promise(function (resolve, reject) {
        tagDAO.distinct('client_id', {time: {"$gte": from, "$lt": to}}, function (err, logs) {
            if (err) {
                reject(err);
            }
            resolve(logs);
        });
    });
}

function _getUsersGeoLocations(from, to, clientsIds) {
    console.log("Retrieving locations for clientIds");
    return new Promise(function (resolve, reject) {
        // {$match: {client_id: {$in: clientIds}}}
        geoDAO.aggregate([
            {
                $match: {
                    client_id: {$in: clientsIds},
                    time :{"$gte": from, "$lte": to}
                }
            },
            {
                $group: {
                    _id: '$client_id',
                    location: {$first: "$location"}
                }
            }], function (err, locations) {
            if (err) {
                reject(err);
            }
            resolve(locations);
        });
    });
}

var TagController = {
    path: 'tags',

    getTaggedUsersLocations: function (req, res) {
        return _getTaggedUsers(req.query.from, req.query.to).then(function (clientsIds) {
            return _getUsersGeoLocations(req.query.from, req.query.to, clientsIds)
        }).then(function (locations) {
            res.json(locations);
        });
    },

    routes: function (app) {
        app.get(configs.API_PREFIX + this.path + '/getTaggedUsersLocations', this.getTaggedUsersLocations);
    }
};
module.exports = TagController; 