(function () {
    "use strict";

    // Define settings controller
    var SettingsController = function (constants) {

        // current scope
        var settings = this;

        settings.iconStyle = {};

        function setFontColor(style) {
            settings.fontStyle = style;
            settings.iconStyle.color = style.color;
        }

        function setBackgroundColor(style) {
            settings.backgroundStyle = style;
        }
        function setIconColor(style) {
            settings.iconStyle.backgroundColor = style.color;
        }

        settings.colorConfigs = [{
            title: "Background color",
            onChange: setBackgroundColor,
            selectedColorPallet: "#234",
            colorPallet: ["rgb(132, 24, 59)", "rgb(101, 34, 34)", "#234", "rgb(14, 97, 90)", "rgb(44, 115, 49)", "rgb(128, 112, 36)"],
            style: {}
        }, {
            title: "Icon color",
            selectedColorPallet: "rgb(9, 13, 17)",
            onChange: setIconColor,
            colorPallet: ["rgb(9, 13, 17)", "rgb(152, 45, 45)", "rgb(67, 117, 51)", "rgb(51, 117, 105)", "rgb(73, 65, 144)", "rgb(123, 119, 68)"],
            style: {}
        }];


        function getNobeStyle(event) {

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

            return nobeStyle;
        }

        settings.setColor = function (event, colorConfigs) {

            colorConfigs.style = getNobeStyle(event);

            if (colorConfigs.onChange && typeof (colorConfigs.onChange) === "function") {
                colorConfigs.onChange(colorConfigs.style);
            }
        };

        settings.selectPredefinedColor = function (colorConfigs, color) {

            colorConfigs.selectedColorPallet = color;

            colorConfigs.style = {
                color: color
            };
            if (colorConfigs.onChange && typeof (colorConfigs.onChange) === "function") {
                colorConfigs.onChange(colorConfigs.style);
            }
        };

        (function () {
            var settingsToApply = constants.settingsToApply;

            if (settingsToApply) {

                if (settingsToApply.backgroundStyle) {
                    settings.backgroundStyle = {
                        color: settingsToApply.backgroundStyle.backgroundColor
                    };
                    settings.colorConfigs[0].selectedColorPallet = settingsToApply.backgroundStyle.backgroundColor;
                }

                if (settingsToApply.iconStyle) {
                    settings.iconStyle = settingsToApply.iconStyle || {};
                    settings.colorConfigs[1].selectedColorPallet = settings.iconStyle.color;
                    settings.colorConfigs[2].selectedColorPallet = settings.iconStyle.backgroundColor;
                }
            }

        }());

        return settings;
    };

    // Define enroll module
    angular.module("puzzler.settings")

    // Enroll controller
    .controller("SettingsController", ['constants', SettingsController]);
}());