(function () {
    "use strict";

    // service definition
    var iconService = function (api, constants, storage) {

        // Get service pointer
        var service = this,
            puzzles = [],
            key = constants.iconStorageKey;

        // get puzzles
        service.getPuzzle = function (puzzleId) {

            // get icon list if not present
            if (!puzzles || !puzzles.length) {
                puzzles = storage.get(key);
            }

            // handle undefined result
            puzzles = puzzles || [];

            // if only one icon needed
            if (puzzleId) {
                return puzzles.filter(function (puzzle) { return puzzle.id === puzzleId; })[0];
            }

            // else return all puzzles
            return puzzles;
        };

        // save icon(s)
        service.saveIcons = function (iconList) {

            if (typeof (iconList) === "object") {

                // add to icon list
                puzzles.push(iconList);

            } else if (iconList && iconList.length) {

                // replace whole list
                puzzles = iconList;
            } else {
                return;
            }

            // save updated icon list
            return storage.set(puzzles, key);
        };
        
        // delete icon
        service.deleteIcon = function (puzzleId) {
            
            // handle undefined result
            puzzles = puzzles || [];

            // if only one icon needed
            if (puzzleId) {
                puzzles = puzzles.filter(function (puzzle) { return puzzle.id !== puzzleId; });
            } else {
                return;
            }

            // save and return updated list
            return storage.set(puzzles, key);
        };

        // reset icons
        service.resetAll = function () {
            puzzles = [];
        };

        // Return service pointer
        return service;
    };

    // Define auth service module
    angular.module("puzzler.services")

// Adding the service
.service("iconservice", ["apiservice", "constants", "storageservice", iconService]);
}());