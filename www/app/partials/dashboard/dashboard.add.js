(function () {
    "use strict";

    // Define enroll controller
    var AddPuzzleController = function (constants) {

        // scope 
        var add = this;

        // reset puzzle creator
        function resetPuzzleCreator(currentStep) {

            // reset hint creator
            add.selectedCreator = undefined;

            // remove added action button
            currentStep.customStepActions = [];
        }

        // set puzzle creator
        function selectPuzzleCreator(currentStep) {

            // do post select 
            var creatorOption = add.selectedCreator;

            var puzzleDetails = {};

            // image dimensions
            puzzleDetails.height = creatorOption.height || 350;
            puzzleDetails.width = creatorOption.width || 350;

            // puzzle image
            puzzleDetails.imageData = creatorOption.uploadedIconUrl || creatorOption.rawFileUrl;

            // puzzle icon
            puzzleDetails.iconData = "url(".concat(creatorOption.iconUrl || creatorOption.rawFileUrl, ")");

            // call step complete callback
            if (currentStep.onComplete && typeof (currentStep.onComplete) === "function") {
                currentStep.onComplete(puzzleDetails);
            }
        }

        // hint create options
        add.createOptions = constants.createHints;

        // select hint creator
        add.selectPuzzleCreator = function (currentStep, creatorOption) {

            // set hint creator
            add.selectedCreator = angular.copy(creatorOption);

            // append action
            currentStep.customStepActions = [{
                performAction: resetPuzzleCreator,
                actionClass: "fa-times discardChanges"
            }, {
                performAction: selectPuzzleCreator,
                actionClass: "fa-check saveChanges"
            }];

        };
    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Enroll controller
    .controller("AddPuzzleController", ["constants", AddPuzzleController]);
}());