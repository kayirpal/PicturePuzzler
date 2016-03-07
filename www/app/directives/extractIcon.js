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
                    maxWidth = window.innerWidth - (window.innerWidth % 80),
                    maxHeight = window.innerHeight - (window.innerHeight % 80),
                    widthDiff = maxWidth - width,
                    heightDiff = maxHeight - height;

                if (!attr.noChanges) {

                    if (heightDiff > widthDiff) {
                        scaleRatio = maxWidth / width;
                    } else {
                        scaleRatio = maxHeight / height;
                    }

                    scaleRatio *= 0.8;

                    width *= scaleRatio;
                    height *= scaleRatio;

                    width = width - (width % 80);
                    height = height - (height % 80);

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


                scope.extractIcon.rotate = function (degree) {

                    context.translate(width / 2, height/2);
                    context.rotate(degree * Math.PI / 180);
                    context.translate(-width / 2, -height/2);
                    var newImageUrl = canvas.toDataURL("image/png");
                    var imageObj2 = new Image();
                    imageObj2.height = height;
                    imageObj2.width = width;
                    imageObj2.src = newImageUrl;
                    imageObj2.onload = function () {
                        context.drawImage(imageObj2, 0, 0, width, height);
                        scope.extractIcon.width = width;
                        scope.extractIcon.height = height;
                        scope.extractIcon.uploadedIconUrl = canvas.toDataURL("image/png");
                        scope.extractIcon.iconUrl = canvas.toDataURL("image/png", 1);

                        context.translate(width / 2, height / 2);
                        context.rotate(-degree * Math.PI / 180);
                        context.translate(-width / 2, -height / 2);
                    };
                    
                    // update image
                };
            }
        };
    };

    // Define directive module
    angular.module("puzzler.directives")

    .directive("extractIcon", extractIcon);
}());