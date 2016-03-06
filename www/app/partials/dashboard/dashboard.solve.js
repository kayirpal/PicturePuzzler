(function () {
    "use strict";

    // Define enroll controller
    var SolvePuzzuleController = function (stateParams, iconService) {

        var solve = this;

        // default block length
        var blockLength = 100;

        solve.hintDetails = {};

        solve.picturePieces = [];
        
        // create puzzle pieces 
        solve.createPuzzlePieces = function (currentStep) {

            if(!currentStep){
                return;
            }

            // append action
            currentStep.customStepActions = currentStep.customStepActions.concat([{
                performAction: function () {
                    if (typeof (solve.resetPieces) === "function") {
                        solve.resetPieces();
                    }
                },
                actionClass: "color-yellowish fa-repeat"
            }, {
                performAction: function () {
                    if (typeof (solve.shufflePieces) === "function") {
                        solve.shufflePieces();
                    }
                },
                actionClass: "color-greenish fa-random"
            }]);

        };

        //init
        (function () {

            // get puzzle id from state parameters 
            var puzzleId = stateParams.puzzleId,
                styleFormat = ".puzzlePiece {background-image: url('|image|');width: |width|px; height: |height|px;}";

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