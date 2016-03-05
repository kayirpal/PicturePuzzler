(function () {
    "use strict";

    // Define enroll controller
    var SolvePuzzuleController = function (state, stateParams, constants, secretService, iconService) {

        var solve = this;

        var puzzleSettings = {
            width: 400,
            height: 300,
            blockLength: 100
        };

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
            } else {

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
            var puzzleId = stateParams.puzzleId,
                styleFormat = ".puzzlePiece {background-image: url('|image|');width: |width|px; height: |height|px;}";//.puzzlePiece{background-image: |image|;width: |width|px;height:|height|px;}";
            
            // get puzzle from service
            solve.puzzleDetails = iconService.getPuzzle(puzzleId);

            // create puzzle pieces
            var xPos = 0,
                width = solve.puzzleDetails.width,
                height = solve.puzzleDetails.height,
                blockLength = puzzleSettings.blockLength,
                yPos;

            var sheet = document.createElement('style');

            // add background image property
            //var puzzlePieceImage = document.createElement("style");

            // insert background image
            styleFormat = styleFormat.replace("|image|", solve.puzzleDetails.imageData);

            // insert width and height
            styleFormat = styleFormat.replace("|width|", blockLength);
            styleFormat = styleFormat.replace("|height|", blockLength);

            //// update style
            //puzzlePieceImage.innerHTML = puzzlePieceImage;
            //document.body.appendChild(puzzlePieceImage);

            sheet.innerHTML = styleFormat;
            document.body.appendChild(sheet);

            // create width/blockLength columns
            while (width > xPos) {

                // reset y position for each column
                yPos = 0;

                // create height/blockLength rows
                while (height > yPos) {

                    (function () {

                        // initialize piece
                        var puzzlePiece = {
                            id: solve.picturePieces.length,
                            style: {}
                        };

                        // set piece position
                        puzzlePiece.style.top = yPos + "px";
                        puzzlePiece.style.left = xPos + "px";

                        // set background image info
                        puzzlePiece.style.backgroundPositionY = ((-1) * yPos) + "px";
                        puzzlePiece.style.backgroundPositionX = ((-1) * xPos) + "px";

                        // add to list of pieces
                        solve.picturePieces.push(puzzlePiece);
                    }());

                    // next row
                    yPos += blockLength;
                }

                // next column
                xPos += blockLength;
            }

            // initial shuffle 
           // solve.shufflePieces(solve.picturePieces);

        }());
    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("SolvePuzzuleController", ["$state", "$stateParams", "constants", "secretservice", "iconservice", SolvePuzzuleController]);
}());