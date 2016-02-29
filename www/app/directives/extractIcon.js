(function () {
    "use strict";

    var extractIcon = function () {

        return {

            scope: {
                extractIcon: "="
            },
            link: function (scope, element, attr) {

                scope.extractIcon = scope.extractIcon || {};

                var canvas = element[0];
                var context = canvas.getContext('2d');
                // 4:3
                var width = canvas.width,
                    scaleRatio = 1,
                    height = canvas.height,
                    widthDiff = window.innerWidth - width,
                    heightDiff = window.innerHeight - height;

                if (!attr.noChanges) {

                    if (heightDiff > widthDiff) {
                        scaleRatio = window.innerWidth / width;
                    } else {
                        scaleRatio = window.innerHeight / height;
                    }

                    scaleRatio *= 0.75;

                    width *= scaleRatio;
                    height *= scaleRatio;

                    canvas.width = width;
                    canvas.height = height;
                }


                var imageObj = new Image();
                imageObj.height = height;
                imageObj.width = width;
                imageObj.src = scope.extractIcon.rawFileUrl;
                imageObj.onload = function () {
                    context.drawImage(imageObj, 0, 0, width, height);
                    scope.extractIcon.uploadedIconUrl = canvas.toDataURL("image/png");
                };
            }
        };
    };

    // Define directive module
    angular.module("puzzler.directives")

    .directive("extractIcon", extractIcon);
}());