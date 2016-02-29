(function () {
    "use strict";

    // Define directive
    var animationEnd = function () {

        // define directive object
        var animationEndDirective = {};

        // Set restrict
        // Restrict to element and attribute
        animationEndDirective.restrict = "A";


        // define linking funtion
        /*
        @param {object} scope of the elmenet
        @param {object} the elmenet
        @param {object} attribute of the elmenet
        */
        animationEndDirective.link = function (scope, element, attribute) {

            var el = element[0];

            el.addEventListener(
                'webkitAnimationEnd',
                function () {
                    if (scope[attribute.animationEnd]) {
                        scope[attribute.animationEnd](element);
                    }
                    return false;
                },
                false
                );
        };

        return animationEndDirective;
    };

    // Define directive module
    angular.module("puzzler.directives")

    // Add the directive to the module
    .directive("animationEnd", animationEnd);
}());