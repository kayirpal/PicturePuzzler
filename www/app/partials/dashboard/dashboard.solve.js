(function () {
    "use strict";

    // Define enroll controller
    var SolvePuzzuleController = function (constants, secretService) {

        var solve = this;

        solve.hintDetails = {};

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

    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("SolvePuzzuleController", ["constants", "secretservice", SolvePuzzuleController]);
}());