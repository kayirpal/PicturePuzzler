(function () {
    "use strict";

    // Define enroll controller
    var SolvePuzzuleController = function (scope, stateParams, constants, secretService, iconService) {

        var solve = this;

        solve.hintDetails = {};

        solve.picturePieces = [];

        solve.showHideHint = function (currentStep) {
            var background = "url(";

            if ((!solve.showHint && currentStep.hintDetails) || !solve.hintDetails.background) {

                if (currentStep.hintDetails.hintImageData) {

                    background = background.concat(currentStep.hintDetails.hintImageData, ")");
                    solve.hintDetails.background = background;
                    solve.showHint = true;
                }
            } else  {

                solve.hintDetails.background = undefined;
                solve.showHint = false;
            }
        };

        // guess secret phrase
        solve.guessPhrase = function (guessPhrase, message) {

            // match all
            var encryptedGuess = secretService.encryptPhrase(guessPhrase);

            solve.showHint = true;
            solve.hintDetails.background = undefined;


            if (encryptedGuess.encodedPhrase === message.encodedPhrase) {
                solve.bulbColor = "rgb(33, 136, 33)";
                solve.thumbsClass = "fa-thumbs-up";
            } else {
                solve.bulbColor = "rgb(181, 25, 25)";
                solve.thumbsClass = "fa-thumbs-down";
            }

        };

        // shuffle pieces
        solve.shufflePieces = function (picturePieces) {

            if (picturePieces && picturePieces.length) {

                var cellCount = picturePieces.length;

                picturePieces.forEach(function (picturePiece, index) {

                    var randonIndex = index,
                        targetPiece,
                        temp,
                        tries = 5;

                    while (index === randonIndex && tries) {
                        randonIndex = parseInt(Math.random() * cellCount, 10);
                        tries -= 1;
                    }

                    targetPiece = picturePieces[randonIndex];

                    // swap positions

                    // swap x coordinate
                    temp = picturePiece.style.left;
                    picturePiece.style.left = targetPiece.style.left;
                    targetPiece.style.left = temp;

                    // swap y coordinate
                    temp = picturePiece.style.top;
                    picturePiece.style.top = targetPiece.style.top;
                    targetPiece.style.top = temp;
                });
            }
        };
                
        // reset positions of the pieces
        solve.resetPieces = function (picturePieces) {

            // if any pieces exists
            if (picturePieces && picturePieces.length) {

                picturePieces.forEach(function (picturePiece) {

                    // reset x coordinate
                    picturePiece.style.left = picturePiece.style.backgroundPositionX.replace("-", "");

                    // swap y coordinate
                    picturePiece.style.top = picturePiece.style.backgroundPositionY.replace("-", "");

                });
            }
        };

        //init
        (function () {

            // get puzzle id from state parameters 
            var puzzleId = stateParams.puzzleId;

            // get puzzle from service
            solve.puzzleDetails = iconService.getPuzzle(puzzleId);


        }());

    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("SolvePuzzuleController", ["$scope", "$stateParams", "constants", "secretservice", "iconservice", SolvePuzzuleController]);
}());