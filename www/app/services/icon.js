(function () {
    "use strict";

    // service definition
    var iconService = function (api, constants, storage) {

        // Get service pointer
        var service = this,
            icons = [],
            key = constants.iconStorageKey;

        // get icons
        service.getIcons = function (iconId) {

            // get icon list if not present
            if (!icons || !icons.length) {
                icons = storage.get(key);
            }

            // handle undefined result
            icons = icons || [];

            // if only one icon needed
            if (iconId) {
                return icons.filter(function (icon) { return icon.id === iconId; })[0];
            }

            // else return all icons
            return icons;
        };

        // save icon(s)
        service.saveIcons = function (iconList) {

            if (typeof (iconList) === "object") {

                // add to icon list
                icons.push(iconList);

            } else if (iconList && iconList.length) {

                // replace whole list
                icons = iconList;
            } else {
                return;
            }

            // save updated icon list
            return storage.set(icons, key);
        };
        
        // delete icon
        service.deleteIcon = function (iconId) {
            
            // handle undefined result
            icons = icons || [];

            // if only one icon needed
            if (iconId) {
                icons = icons.filter(function (icon) { return icon.id !== iconId; });
            } else {
                return;
            }

            // save and return updated list
            return storage.set(icons, key);
        };

        // Return service pointer
        return service;
    };

    // Define auth service module
    angular.module("puzzler.services")

// Adding the service
.service("iconservice", ["apiservice", "constants", "storageservice", iconService]);
}());