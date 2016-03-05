(function () {
    "use strict";

    // Define dashboard controller
    var dashboardController = function (rootScope, state, constants, pService, iconService) {

        var dashboard = this;
        
        dashboard.puzzles = [];

        //Common methods


        //# region create icon 

        // add new puzzle
        function createPuzzle(puzzleDetails) {

            if (puzzleDetails.imageData && puzzleDetails.iconData) {

                // get puzzle id
                puzzleDetails.id = pService.generateGUID();

                // add to list
                dashboard.puzzles.push(puzzleDetails);

                // save icon
                iconService.saveIcons(puzzleDetails);

            }

            // close creator window
            dashboard.hideUserActions();
        }

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
        //#endregion

        // remove puzzle
        function removePuzzle(puzzleDetails) {

            var iconIndex = dashboard.puzzles.length;

            if (puzzleDetails && iconIndex) {

                while (iconIndex >= 0) {
                    iconIndex -= 1;
                    var icon = dashboard.puzzles[iconIndex];

                    if (icon.iconId === puzzleDetails.iconId) {
                        dashboard.puzzles.splice(iconIndex, 1);
                        break;
                    }
                }
            }

            // update saved list
            iconService.saveIcons(dashboard.puzzles);

            dashboard.hideUserActions();
        }

        // open solve puzzle window
        dashboard.trySolvingPuzzle = function (puzzle) {
            
            // set current step
            dashboard.currentStep = constants.solvePuzzleStep;

            // show available actions
            dashboard.currentStep.customStepActions = [{
                performAction: removePuzzle,
                actionClass: "color-yellowish fa-repeat"
            }, {
                performAction: removePuzzle,
                actionClass: "color-greenish fa-random"
            }, {
                performAction: removePuzzle,
                actionClass: "deleteIcon fa-trash-o"
            }];

            // open solve puzzle page
            state.go("dashboard.solve", {
                puzzleId: puzzle.id
            });
        };

        // init
        (function () {
            var currentState = state.current || {};

            // get saved icons
            var savedPuzzles = iconService.getPuzzle();

            if (savedPuzzles && savedPuzzles.length) {
                dashboard.puzzles = savedPuzzles;
            }

            if (currentState.name && currentState.name === "dashboard.add") {
                // add new icon
                dashboard.startPuzzleCreation();
            } else if (currentState.name && currentState.name === "dashboard.solve") {
                state.go("dashboard");
            }
        }());

    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("dashboardController", ["$rootScope", "$state", "constants", "secretservice", "iconservice", dashboardController]);
}());