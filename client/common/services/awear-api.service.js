/**
 * Created by yotam on 22/12/2016.
 */
angular.module('myApp.services')
    .service('AwearAPIService', ['$http', '$q', function ($http, $q) {
        var RESULTS_LIMIT = 1000; // This is the current max Airbnb allows for this API call.
        var PAGE_LIMIT = 50;
        var PAGES_IN_BATCH = RESULTS_LIMIT / PAGE_LIMIT;
        var API_PREFIX = '/api/';

        function _getListingsPagesBatch(location) {
            return $q.when(requests);
        }

        function _getListingsPageByLocation(location, offset) {
            return $http.get(API_PREFIX + '/search_results?' +
                'client_id=3092nxybyb0otqw18e8nh5nty&' +
                '_limit=' + PAGE_LIMIT + '&' +
                '_offset=' + offset + '&' +
                'location=' + location)
                .then(function (result) {
                    return result.data.search_results;
                });
        }


        var Service = {
            /**
             * get all users that were active in the given time range.
             * @param fromTime
             * @param toTime
             * @returns {HttpPromise}
             */
            getActiveUsersByTimeRange: function (fromTime, toTime) {
                // filter all results where the local time is between fromTime and toTime
                return $http.get(API_PREFIX + 'tags/getTaggedUsersLocations?from=' + fromTime +'&to=' + toTime);

            },
            getLocationsOfUsers: function(){
                
            }

        };

        return Service;
    }]);
