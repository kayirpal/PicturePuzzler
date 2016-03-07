(function () {
    "use strict";

    // Define main module
    angular.module("puzzler", ["ui.router"
        , "puzzler.share"
        , "puzzler.common"
        , "puzzler.services"
        , "puzzler.directives"
        , "puzzler.enroll"
        , "puzzler.dashboard"
        , "puzzler.settings"
    ]);
}());