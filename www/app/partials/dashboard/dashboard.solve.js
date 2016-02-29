(function () {
    "use strict";

    // Define enroll controller
    var SolvePuzzuleController = function (constants, secretService) {

        var guess = this;

        guess.hintDetails = {};

        guess.showHideHint = function (currentStep) {
            var background = "url(";

            if ((!guess.showHint && currentStep.hintDetails) || !guess.hintDetails.background) {

                if (currentStep.hintDetails.hintImageData) {

                    background = background.concat(currentStep.hintDetails.hintImageData, ")");
                    guess.hintDetails.background = background;
                    guess.showHint = true;
                }
            } else  {

                guess.hintDetails.background = undefined;
                guess.showHint = false;
            }
        };

        // guess secret phrase
        guess.guessPhrase = function (guessPhrase, message) {

            // match all
            var encryptedGuess = secretService.encryptPhrase(guessPhrase);

            guess.showHint = true;
            guess.hintDetails.background = undefined;


            if (encryptedGuess.encodedPhrase === message.encodedPhrase) {
                guess.bulbColor = "rgb(33, 136, 33)";
                guess.thumbsClass = "fa-thumbs-up";
            } else {
                guess.bulbColor = "rgb(181, 25, 25)";
                guess.thumbsClass = "fa-thumbs-down";
            }

        };

    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("SolvePuzzuleController", ["constants", "secretservice", SolvePuzzuleController]);
}());