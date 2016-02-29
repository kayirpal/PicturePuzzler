(function () {
    "use strict";

    // Define settings controller
    var ShareController = function (state, constants) {

        // current scope
        var share = this;

        share.shareOptions = [{
            classList: "fa fa-facebook",
            animateClass: "rotateInDownLeft",
            shareLink: "http://www.facebook.com/sharer.php?u=DoYouRemember",
            spinnerColor: "#3A5795"
        }, {
            classList: "fa fa-twitter",
            shareLink: "https://twitter.com/share?url=http://www.laprik.com/12345&amp;text=Do%20you%20remember%20that!&amp;hashtags=DoYouRemember",
            animateClass: "rotateInDownRight",
            spinnerColor: "#28A9E0"
        }, {
            classList: "fa fa-google-plus",
            shareLink: "https://plus.google.com/share?url=http://www.laprik.com/12345",
            animateClass: "slideInDown",
            spinnerColor: "#EA4335"
        }, {
            classList: "fa fa-reddit-alien",
            shareLink: "http://reddit.com/submit?url=http://www.laprik.com/12345&amp;title=DoYouRemember",
            animateClass: "slideInUp",
            spinnerColor: "rgb(247, 97, 70)"
        }, {
            classList: "fa fa-envelope",
            shareLink: "mailto:?Subject=Do%20you%20remember%20that&amp;https://www.laprik.com/12345",
            animateClass: "rotateInUpRight",
            spinnerColor: "#3A5795"
        }];

        return share;
    };

    // Define enroll module
    angular.module("puzzler.share")

    // Enroll controller
    .controller("ShareController", ['$state', 'constants', ShareController]);
}());