(function () {
    "use strict";

    var storageService = function ($q, constants, secretService) {

        // Get service pointer
        var service = this,
            storage = localStorage;

        // store data
        function _store(data, key) {

            try
            {
                storage.setItem(key, data);
                return true;
            }
            catch (ex) {
                console.log(ex)
                return false;
            }
        }

        // read data
        function _read(key) {
            try {
                return storage.getItem(key);
            }
            catch (ex) {
                console.log(ex);
                return;
            }
        }

        // get data
        service.get = function (key) {

            // get data from storage
            var dataString = _read(key);
            
            // if any data exists
            if (dataString) {

                // try parsing
                try {

                    // return parsed object
                    return JSON.parse(dataString);
                } catch (ex) {
                    console.log(ex);
                }
            }
        };

        // save data
        service.set = function (data, key,  isEncryptionRequired) {

            // data is needed to encrypt
            if(!data){
                return;
            }
            
            // convert to string
            var stringifiedData = JSON.stringify(data),
                encryptedData;

            if (isEncryptionRequired) {

              //  var key = constants.storageKey;

                encryptedData = secretService.encryptPhrase(stringifiedData);

                // use encodedPhrase
                stringifiedData = encryptedData.encodedPhrase;
            }
            
            // store data 
            if (_store(stringifiedData, key)) {
                return true;
            }
        };

        // reset everything
        service.resetAll = function () {
            if(storage.clear && typeof(storage.clear)==="function"){
                storage.clear();
            }
        };

        // Return service pointer
        return service;
    };

    // Define auth service module
    angular.module("puzzler.services")

// Adding the service
.service("storageservice", ["$q", "constants", "secretservice", storageService]);
}());