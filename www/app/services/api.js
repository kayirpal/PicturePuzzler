(function () {
    "use strict";

    var apiService = function ($q) {

        // Get service pointer
        var api = this;

        function _sendRequest(method, url, data, isFileUploader, overrideKey, isParseRequired) {

            // prepare response
            var response = $q.defer();

            // prepare request
            var request = {
                method: method,
                url: url
            };

            // if post request
            if (!!data) {

                // set data
                if (isParseRequired) {
                    data = JSON.stringify(data);
                }

                // set data
                request.data = data;

                // set upload headers
                if (isFileUploader) {
                    request.contentType = 'application/x-www-form-urlencoded';
                }
            }

            // ajax request
            $.ajax(request).done(function (data) {

                // resolve the pending request
                response.resolve(data);
            }).fail(function (error) {

                // reject the pending request
                response.reject(error);
            });

            // return promise
            return response.promise;
        }

        // get method
        api.get = function (url, overrideKey) {
            return _sendRequest("GET", url, false, false, overrideKey);
        };

        // post method
        api.post = function (url, data, overrideKey, isParseRequired) {
            return _sendRequest("POST", data, false, overrideKey, isParseRequired);
        };

        // upload
        api.upload = function (url, data, overrideKey, isParseRequired) {
            return _sendRequest("POST", url, data, true, overrideKey, isParseRequired);
        };

        // Return service pointer
        return api;
    };

    // Define auth service module
    angular.module("puzzler.services")

// Adding the service
.service("apiservice", ["$q", apiService]);
}());