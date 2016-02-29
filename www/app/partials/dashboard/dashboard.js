(function () {
    "use strict";

    // Define dashboard controller
    var dashboardController = function (rootScope, state, constants, pService, iconService) {

        var dashboard = this;
        
        dashboard.icons = [];

        //Common methods

        // add new puzzle
        function createPuzzle(puzzleDetails) {

            // get puzzle id
            var id = pService.generateGUID();

            // add to list
            dashboard.icons.push({
                iconId: id,
                message: puzzleDetails.message,
                iconDetails: puzzleDetails.iconDetails
            });

            // close creator window
            dashboard.hideUserActions();
        };
        
        // open add new puzzle window
        dashboard.startPuzzleCreation = function () {
            dashboard.currentStep = constants.createPuzzleStep;

            dashboard.currentStep.onComplete = createPuzzle;

            state.go("dashboard.add");
        };
        
        // hide new puzzle window
        dashboard.hideUserActions = function () {
            dashboard.currentStep = undefined;            
            state.go("dashboard");
        };

        //# region create icon 

        //#endregion

        // remove puzzle
        function removePuzzle(puzzleDetails) {

            var iconIndex = dashboard.icons.length;

            if (puzzleDetails && iconIndex) {

                while (iconIndex >= 0) {
                    iconIndex -= 1;
                    var icon = dashboard.icons[iconIndex];

                    if (icon.iconId === puzzleDetails.iconId) {
                        dashboard.icons.splice(iconIndex, 1);
                        break;
                    }
                }
            }

            // update saved list
            iconService.saveIcons(dashboard.icons);

            dashboard.hideUserActions();
        }

        dashboard.solvePuzzle = function (icon) {
            
            // set current step
            dashboard.currentStep = constants.solvePuzzleStep;

            // set secret word
            dashboard.currentStep.message = icon.message;

            // set hint details
            dashboard.currentStep.hintDetails = icon.hintDetails;

            dashboard.currentStep.customStepActions = [{
                performAction: removePuzzle,
                actionClass: "color-light-redish fa-share-square-o"
            }, {
                performAction: removePuzzle,
                actionClass: "color-greenish fa-random"
            }, {
                performAction: removePuzzle,
                actionClass: "deleteIcon fa-trash-o"
            }];

            // open solve puzzle page
            state.go("dashboard.solve");
        };

        // init
        (function () {
            var currentState = state.current || {};

            // get saved icons
            var savedIcons = iconService.getIcons();

            if (savedIcons && savedIcons.length) {
                dashboard.icons = savedIcons;
            }

            if (currentState.name && currentState.name === "dashboard.add") {
                // add new icon
                dashboard.startPuzzleCreation();
            }
        }());

    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("dashboardController", ["$rootScope", "$state", "constants", "secretservice", "iconservice", dashboardController]);
}());