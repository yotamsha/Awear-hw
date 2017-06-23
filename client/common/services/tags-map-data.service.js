/**
 * Created by yotam on 22/12/2016.
 */
angular.module('myApp.services')
    .service('TagsMapService', [ function () {
        var _map;
        function _renderMarkers(data){
            for (var i = 0; i < data.length; i++) {
                var coords = data[i].location.coordinates;
                var latLng = new google.maps.LatLng(coords[0], coords[1]);
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: _map
                });
            }
        }
        var Service = {
            /**
             * Init the heatmap UI component using the Google Maps JS API.
             * refer to: https://developers.google.com/maps/documentation/javascript/heatmaplayer
             * @param data the weighted geolocation datapoints for the heatmap visualization calculation.
             */
            initMap: function (data) {
                var telAviv = {lat: 32.074794, lng: 34.775225};
                _map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: telAviv,
                    mapTypeId: 'roadmap'
                });
                _renderMarkers(data);
            }

        };

        return Service;
    }]);
