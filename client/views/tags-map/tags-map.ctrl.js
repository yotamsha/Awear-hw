'use strict';

angular.module('myApp.tags-map', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/tags-map/tags-map.html',
            controller: 'TagsMapCtrl',
            controllerAs: 'ctrl',
            reloadOnSearch : false
        });
    }])

    .controller('TagsMapCtrl', ['AwearAPIService','TagsMapService','$rootScope','UtilsService','Consts',
        function (AwearAPIService, TagsMapService, $rootScope, UtilsService, Consts) {

            var ctrl = this;
            ctrl.dataLoaded = false;

            function _getUsersLocations(){
                var fromDate = UtilsService.setDateHour(ctrl.searchDate, ctrl.fromHour);
                var toDate = UtilsService.addHours(fromDate,Consts.SEARCH_HOURS_RANGE);
                AwearAPIService.getActiveUsersByTimeRange(
                    UtilsService.convertUTC(fromDate).toISOString(),
                    UtilsService.convertUTC(toDate).toISOString()).then(function(response){
                    TagsMapService.initMap(response.data);
                    ctrl.dataLoaded = true;
                });
            }
            
            function _hourChanged() {
                ctrl.toHour = UtilsService.addHours(ctrl.fromHour, Consts.SEARCH_HOURS_RANGE);
            }
            
            function _init(){
                ctrl.searchDate = new Date();
                ctrl.fromHour = new Date();
                ctrl.toHour = UtilsService.addHours(ctrl.fromHour,Consts.SEARCH_HOURS_RANGE);
                _getUsersLocations();
                // listen to hour changes
                $rootScope.$on('mdpTimePickerUpdated', function() {
                    _hourChanged();
                });
            }

            ctrl.searchTags = function() {
                _getUsersLocations();

            };

            _init();

        }]);
