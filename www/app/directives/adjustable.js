/*jshint -W001 */
(function () {
    "use strict";

    var adjustable = function () {

        var directive = {};

        directive.restrict = "A";

        directive.link = function (scope, element, attr) {

            var height = Number(attr.height),
                width = Number(attr.width);

            var elementStyle = element[0].style,
                zoomLevel = 1,
                    widthDiff = window.innerWidth - width,
                    heightDiff = window.innerHeight - height;


            if (heightDiff > widthDiff) {
                //zoomOffset = (window.innerWidth * height) / width;
                zoomLevel = window.innerWidth / width;
            } else {
                //zoomOffset = (window.innerHeight * width) / height;
                zoomLevel = window.innerHeight / height;
            }

            if (zoomLevel > 1) {
                zoomLevel *= 0.8;
            } else {
                zoomLevel *= 0.9;
            }


            elementStyle.transform = "scale(" + zoomLevel + ")";

        };

        return directive;
    };

    // Define directive module
    angular.module("puzzler.directives")

    // Add the directive to the module
    .directive("adjustable", adjustable);
}());