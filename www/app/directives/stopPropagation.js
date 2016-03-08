(function () {
    "use strict";

    var stopPropagation = function () {

        var directive = {};

        directive.restrict = "A";

        directive.link = function (scope, element, attr) {

            element.on("click", function (event) {
                event.stopPropagation();
            });
        };

        return directive;
    };

    // Define directive module
    angular.module("puzzler.directives")

    // Add the directive to the module
    .directive("stopPropagation", stopPropagation);
}());