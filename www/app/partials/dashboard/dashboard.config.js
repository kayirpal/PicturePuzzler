(function () {
    "use strict";

    // Main configuration 
    var dashboardConfig = function (stateProvider) {
        
        // create puzzle
        stateProvider.state("dashboard.add", {
            url: "/add",
            controller: "AddPuzzleController as add",
            templateUrl: "app/partials/dashboard/dashboard.add.html"

            // guess secret
        }).state("dashboard.solve", {
            url: "/solve",
            controller: "SolvePuzzuleController as solve",
            templateUrl: "app/partials/dashboard/dashboard.solve.html"
        });
    };

    // Define enroll module
    angular.module("puzzler.dashboard")

    // Add main config
    .config(["$stateProvider", "$urlRouterProvider", dashboardConfig]);
}());