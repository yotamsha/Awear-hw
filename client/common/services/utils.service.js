/**
 * Created by yotam on 23/06/2017.
 */
(function () {
    'use strict';
    angular.module('myApp.services')
        .service('UtilsService', [function () {

            var Service = {
                /**
                 * Convert date to / from UTC time.
                 * @param date to convert
                 * @param isUTC is given date in UTC time, if so, will be converted to local browser time, o/w, will
                 * be converted to UTC.
                 * @returns {*}
                 */
                convertUTC: function (date, isUTC) {
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
                },
                /**
                 * 
                 * @param d - date to add hours to.
                 * @param h - number of hours to add.
                 * @returns {Date} - a new date with the hours added.
                 */
                addHours: function (d, h) {
                    var MILLIS_IN_HOUR = 60 * 60 * 1000;
                    var newDate = new Date(d)
                    newDate.setTime(newDate.getTime() + (h * MILLIS_IN_HOUR));
                    return newDate;
                },
                /**
                 * set the given date's hours and minute to these of the hourDate.
                 * @param date original date
                 * @param hourDate - the date to take hours and minutes from.
                 * @returns {Date} a new Date object with the hours and minutes set to be same as hourDate. 
                 */
                setDateHour: function (date, hourDate) {
                    var d = new Date(date.setHours(hourDate.getHours()));
                    return new Date(d.setMinutes(hourDate.getMinutes()));

                }
            };

            return Service;
        }]);
})();
