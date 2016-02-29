(function () {
    "use strict";

    // declare the constructor function
    var constants = {};

    // site name 
    constants.siteName = "Kirpal Singh";

    // site settings
    constants.siteSettings = {};
        
    // Enroll module constants
    constants.enrollFormClasses = ["form-group", "animated", "fadeInDown"];

    constants.oAuthClasses = ["connectOptionGrid", "animated", "zoomIn"];


    // Main app controller 
    constants.userActionClasses = ["userActions"];

    // Reg-Exp for form validations
    constants.validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // create hints options
    constants.createHints = [{
        wrapperClass: "selectPicture",
        iconClass: "fa-photo",
        autoOpen: true,
        header: "Sherlock mode !!!",
        id: 1
    }, {
        wrapperClass: "capturePicture",
        autoOpen: true,
        iconClass: "fa-camera",
        header: "Paparazzi mode !!!",
        id: 2
    }];
    
    constants.createPuzzleStep = {
        id: 1,
        nextStepIndex: 2,
        state: "dashboard.add",
        stepClass: "createPassHint",
        primaryHeader: "",
        headerClass: "fa-puzzle-piece",
        secondaryHeader: ""
    };

    constants.solvePuzzleStep = {
        id: 4,
        state: "dashboard.guess",
        stepClass: "savePassword",
        primaryHeader: "dif tor heh smusma",
        headerClass: "fa-hand-spock-o",
        passStrengthClass: "",
        secondaryHeader: ""
    };

    constants.iconStorageKey = "KS_SECRET_STORAGE_KEY";

    constants.siteSettingsKey = "KS_SITE_SETTINGS_KEY";

    constants.authKey = "KS_AUTH_KEY";

    // Create directive module under app 
    angular.module('puzzler.common')

    // add the constants 
    .constant("constants", constants);
}());