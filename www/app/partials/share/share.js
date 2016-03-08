(function () {
    "use strict";

    // Define settings controller
    var ShareController = function (state, constants) {

        // current scope
        var share = this;

        share.shareOptions = [{
            classList: "fa fa-facebook",
            animateClass: "rotateInDownLeft",
            shareLink: "http://www.facebook.com/sharer.php?u=http://www.laprik.com/12345",
            spinnerClass: "fa-spin",
            spinnerColor: "#3A5795"
        }, {
            classList: "fa fa-google-plus",
            shareLink: "https://plus.google.com/share?url=http://www.laprik.com/12345",
            animateClass: "slideInDown",
            spinnerClass: "fa-counter-spin",
            spinnerColor: "#EA4335"
        }, {
            classList: "fa fa-reddit-alien",
            shareLink: "http://reddit.com/submit?url=http://www.laprik.com/12345&amp;title=Fun%20Puzzle%20App!",
            animateClass: "slideInUp",
            spinnerClass: "fa-counter-spin",
            spinnerColor: "rgb(247, 97, 70)"
        }, {
            classList: "fa fa-twitter",
            shareLink: "https://twitter.com/share?url=http://www.laprik.com/12345&amp;text=Snap%20a%20photo.%20Turn%20it%20into%20a%20puzzle.%20Challenge%20your%20friends%20:)&amp;hashtags=PicturePuzzler",
            animateClass: "rotateInDownRight",
            spinnerClass: "fa-spin",
            spinnerColor: "#28A9E0"
        }, {
            classList: "fa fa-envelope",
            shareLink: "mailto:?Subject=Fun%20Puzzle%20App!&body=Snap%20a%20photo.%20Turn%20it%20into%20a%20puzzle.%20Challenge%20your%20friends%20:)%20http://www.laprik.com/12345",
            animateClass: "rotateInUpRight",
            spinnerClass: "fa-spin",
            spinnerColor: "rgb(74, 196, 86)"
        }];

        // share external
        share.shareExternal = function () {

            if (window.socialmessage) {
                var message = {
                    text: "Snap a photo. Turn it into a puzzle. Challenge your friends :)",
                    subject: "Fun Puzzle App!",
                    url: "http://www.laprik.com/12345"
                };
                window.socialmessage.send(message);
            }

        };
        return share;
    };

    // Define enroll module
    angular.module("puzzler.share")

    // Enroll controller
    .controller("ShareController", ['$state', 'constants', ShareController]);
}());