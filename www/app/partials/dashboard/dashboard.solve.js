(function () {
    "use strict";

    // Define enroll controller
    var SolvePuzzuleController = function (stateParams, iconService) {

        var solve = this;

        // default block length
        var blockLength = 80;

        solve.scoreDetails = {
            tires: 12,
            passed: 3,
            best: 34,
            current: 56
        };

        solve.hintDetails = {};

        solve.picturePieces = [];

        // create puzzle pieces 
        solve.createPuzzlePieces = function (currentStep) {

            if (!currentStep) {
                return;
            }

            // append actions

            // show/hide actions
            solve.togglePuzzleActions = function(hideActions) {

                hideActions = hideActions || [];

                currentStep.customStepActions.forEach(function (step) {

                    if (step.action && hideActions.indexOf(step.action) >= 0) {
                        step.dontShow = true;
                    } else {
                        delete step.dontShow;
                    }
                });
            }

            // reset puzzle pieces
            currentStep.customStepActions.unshift({
                action: "reset",
                performAction: function () {
                    var hideActions = ["reset", "help"];
                    if (typeof (solve.resetPieces) === "function") {

                        delete solve.isGameOn;

                        solve.togglePuzzleActions(hideActions);
                        solve.resetPieces();
                    }
                },
                dontShow: true,
                actionClass: "color-greenish fa-repeat"
            });

            // Shuffle pieces
            currentStep.customStepActions.unshift({
                action: "set",
                performAction: function () {
                    var hideActions = ["set"];
                    if (typeof (solve.shufflePieces) === "function") {

                        solve.isGameOn = true;

                        solve.scoreDetails.tires += 1;

                        solve.scoreDetails.current = 0;

                        solve.togglePuzzleActions(hideActions);

                        solve.shufflePieces();
                    }
                },
                actionClass: "color-yellowish fa-random"
            });

            // Show hints
            currentStep.customStepActions.unshift({
                action: "help",
                performAction: function (currentStep) {
                    if (typeof (solve.highlightWrongPieces) === "function") {

                        solve.scoreDetails.current += 5;

                        solve.highlightWrongPieces();
                    }
                },
                dontShow: true,
                actionClass: "deleteIcon fa-question"
            });

        };

        //init
        (function () {

            // get puzzle id from state parameters 
            var puzzleId = stateParams.puzzleId,
                styleFormat = ".puzzlePiece {background-image: |image|;width: |width|px; height: |height|px;}";

            // get puzzle from service
            solve.puzzleDetails = iconService.getPuzzle(puzzleId);

            var sheet = document.getElementById('puzzlePieceImage');

            // add background image property
            styleFormat = styleFormat.replace("|image|", solve.puzzleDetails.imageData);

            // insert width and height
            styleFormat = styleFormat.replace("|width|", blockLength);
            styleFormat = styleFormat.replace("|height|", blockLength);

            // update style
            sheet.innerHTML = styleFormat;
        }());
    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("SolvePuzzuleController", ["$stateParams", "iconservice", SolvePuzzuleController]);
}());