(function () {
    "use strict";

    // Define settings controller
    var SettingsController = function (constants) {

        // current scope
        var settings = this;

        // site theme configuration settings
        settings.themeConfig = {
            title: "Theme",
            selectedColorPallet: "#234",
            colorPallet: ["rgb(132, 24, 59)", "rgb(101, 34, 34)", "#234", "rgb(14, 97, 90)", "rgb(44, 115, 49)", "rgb(128, 112, 36)"],
            style: {}
        };

        // set theme 
        settings.setColor = function (event, themeConfig) {

            var offsetX = event.offsetX,
                offset,
                colorString = "";

            offset = offsetX / 75;

            offsetX += 10;

            var nobeStyle = {
                left: offsetX + "px"
            };

            if (offset < 0.5) {
                offset = 1 - offset;
                colorString = "rgba(255,255,255," + offset + ")";
            } else if (offset < 1.5) {
                offset = offset - 0.5;
                colorString = "rgba(255,255,0," + offset + ")";
            } else if (offset < 2.5) {
                offset = offset - 1.5;
                colorString = "rgba(255,25,0," + offset + ")";
            } else if (offset < 3.65) {
                offset = offset - 2.5;
                colorString = "rgba(25,125,0," + offset + ")";
            } else if (offset < 4.65) {
                offset = offset - 3.65;
                colorString = "rgba(0,50,255," + offset + ")";
            } else if (offset < 5.65) {
                offset = offset - 4.65 + 0.5;
                colorString = "rgba(0,20,255," + offset + ")";
            } else {
                offset = offset - 5.65 + 0.5;
                colorString = "rgba(0,0,0," + offset + ")";
            }

            nobeStyle.color = colorString;

            settings.backgroundStyle = nobeStyle;
        };

        // select from predefined themes 
        settings.selectPredefinedColor = function (themeConfig, color) {

            themeConfig.selectedColorPallet = color;

            settings.backgroundStyle = {
                color: color
            };
        };

        // get theme details from site settings
        (function () {
            var settingsToApply = constants.settingsToApply,
                backgroundColor;

            if (settingsToApply && settingsToApply.backgroundStyle) {

                backgroundColor = settingsToApply.backgroundStyle.backgroundColor;

                settings.backgroundStyle = {
                    color: backgroundColor
                };

                settings.themeConfig.selectedColorPallet = backgroundColor;
            }


        }());

        return settings;
    };

    // Define enroll module
    angular.module("puzzler.settings")

    // Enroll controller
    .controller("SettingsController", ['constants', SettingsController]);
}());