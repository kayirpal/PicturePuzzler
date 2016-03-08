(function () {
    "use strict";

    var autoFocus = function () {

        var directive = {};

        directive.restrict = "A";

        directive.link = function (scope, element, attr) {
            element[0].focus();
        };

        return directive;
    };

    // Define directive module
    angular.module("puzzler.directives")

    // Add the directive to the module
    .directive("autoFocus", autoFocus);
}());