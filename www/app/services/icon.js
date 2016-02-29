(function () {
    "use strict";

    // service definition
    var iconService = function (api, constants, storage) {

        // Get service pointer
        var service = this,
            key = constants.iconStorageKey;

        // get icons
        service.getIcons = function () {

            // get icon list 
            return storage.get(key);
        };

        // save icon list
        service.saveIcons = function (iconList) {

            // set icon list without encryption (dev)
            return storage.set(iconList, key);
        };

        // Return service pointer
        return service;
    };

    // Define auth service module
    angular.module("puzzler.services")

// Adding the service
.service("iconservice", ["apiservice", "constants", "storageservice", iconService]);
}());