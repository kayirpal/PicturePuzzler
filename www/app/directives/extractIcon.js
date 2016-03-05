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
                    maxWidth = window.innerWidth - (window.innerWidth % 100),
                    maxHeight = window.innerHeight - (window.innerHeight % 100),
                    widthDiff = maxWidth - width,
                    heightDiff = maxHeight - height;

                if (!attr.noChanges) {

                    if (heightDiff > widthDiff) {
                        scaleRatio = maxWidth / width;
                    } else {
                        scaleRatio = maxHeight / height;
                    }

                    scaleRatio *= 0.9;

                    width *= scaleRatio;
                    height *= scaleRatio;

                    width = width - (width % 100);
                    height = height - (height % 100);

                    canvas.width = width;
                    canvas.height = height;
                }


                var imageObj = new Image();
                imageObj.height = height;
                imageObj.width = width;
                imageObj.src = scope.extractIcon.rawFileUrl;
                imageObj.onload = function () {
                    context.drawImage(imageObj, 0, 0, width, height);
                    scope.extractIcon.width = width;
                    scope.extractIcon.height = height;
                    scope.extractIcon.uploadedIconUrl = canvas.toDataURL("image/png");
                    scope.extractIcon.iconUrl = canvas.toDataURL("image/png", 0.25);                    
                };
            }
        };
    };

    // Define directive module
    angular.module("puzzler.directives")

    .directive("extractIcon", extractIcon);
}());