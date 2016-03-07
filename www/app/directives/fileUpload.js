(function () {
    "use strict";

    var fileUpload = function () {

        var directive = {};

        directive.restrict = "A";
        directive.priority = 1;

        directive.scope = {
            fileUpload: "="
        };
        
        directive.link = function (scope, element, attr) {

            var uploader = document.createElement("input");

            uploader.type = "file";
            uploader.className = "ng-hide";
            
            uploader.onchange = function (event) {

                var curElement = event.currentTarget,
                files = curElement.files,
                file = files[0];

                var reader = new FileReader();
                reader.onload = function (ev) {

                    var uploadedFile = ev.currentTarget.result;

                    scope.fileUpload.rawFileUrl = uploadedFile;
                    
                    if (scope.fileUpload.onComplete && typeof (scope.fileUpload.onComplete) === "function") {
                        scope.fileUpload.onComplete(uploadedFile);
                    }

                    scope.$apply();
                };
                reader.readAsDataURL(file);

                scope.fileUpload.rawFileUrl = undefined;
                scope.$apply();

            };

            scope.fileUpload = scope.fileUpload || {};

            element.append(uploader);
            if (scope.fileUpload.autoOpen) {
                uploader.click();
            }

        };

        return directive;
    };
        
    // Define directive module
    angular.module("puzzler.directives")

    // Add the directive to the module
    .directive("fileUpload", fileUpload);
} ());