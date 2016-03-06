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

            dashboard.currentStep.customStepActions = [];

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
        function removePuzzle(currentStep) {

            var iconIndex = dashboard.puzzles.length;

            if (currentStep && iconIndex) {

                while (iconIndex >= 0) {
                    iconIndex -= 1;
                    var puzzle = dashboard.puzzles[iconIndex];

                    if (puzzle.id === currentStep.id) {
                        dashboard.puzzles.splice(iconIndex, 1);
                        break;
                    }
                }
            }

            // update saved list
            iconService.deleteIcon(currentStep.id);

            dashboard.hideUserActions();
        }

        // open solve puzzle window
        dashboard.trySolvingPuzzle = function (puzzle) {
            
            // set current step
            dashboard.currentStep = constants.solvePuzzleStep;

            // set puzzle id
            dashboard.currentStep.id = puzzle.id;

            // show available actions
            dashboard.currentStep.customStepActions = [{
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
                dashboard.puzzles = angular.copy(savedPuzzles);
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