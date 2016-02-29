(function () {
    "use strict";

    // Define enroll controller
    var EnrollController = function (state, $scope, location, auth, constants, storageService) {

        // current scope
        var enroll = this;

        // Form classes
        enroll.formClasses = constants.enrollFormClasses;

        // validity indicator classes
        enroll.emailGroup = [];
        enroll.passwordGroup = ["input-group", "emptyPassword"];

        enroll.emailProviders = [{
            style: {
                'background-color': "rgb(45, 130, 80)",
                transform: 'rotate(-90deg) skew(50deg)'
            },
            title: "linkedin.com"
        }, {
            style: {
                'background-color': 'rgba(133, 56, 163, 0.42)',
                transform: 'rotate(-50deg) skew(50deg)'
            },
            title: "yahoo.com"
        }, {
            style: {
                'background-color': 'rgb(43, 51, 60)',
                transform: 'rotate(-10deg) skew(50deg)'
            },
            title: "icloud.com"
        }, {
            style: {
                'background-color': 'rgb(116, 117, 47)',
                transform: 'rotate(30deg) skew(50deg)'
            },
            title: "hotmail.com"
        }, {
            style: {
                'background-color': 'rgb(174, 62, 57)',
                transform: 'rotate(70deg) skew(50deg)'
            },
            title: "gmail.com"
        }, {
            style: {
                'background-color': 'rgb(13, 119, 197)',
                transform: 'rotate(110deg) skew(50deg)'
            },
            title: "outlook.com"
        }, {
            style: {
                'background-color': 'rgb(50, 135, 50)',
                transform: 'rotate(150deg) skew(50deg)'
            },
            title: "mail.com"
        }, {
            style: {
                'background-color': 'rgb(125, 65, 140)',
                transform: 'rotate(190deg) skew(50deg)'
            },
            title: "rediffmail.com"
        }];

        enroll.rotateWheelValue = {
            transform: "rotate(0deg)"
        };

        // User
        enroll.userAuthData = {};
        enroll.currentThemeColor = "rgb(174, 62, 57)";
        enroll.currentEmailProvider = "gmail.com";

        var prevRotateIndex = 4,
            prevRotateDeg = 0;

        // rotate wheel
        enroll.rotateWheel = function (sectionIndex, emailProvider) {

            // deg
            var deg = 0,
                diff;

            if (sectionIndex === prevRotateIndex) {
                return;
            }

            diff = prevRotateIndex - sectionIndex;

            deg = diff * 40;

            if (deg > 240) {

                prevRotateDeg += (deg - 360);
            } else if (deg < -240) {

                prevRotateDeg += (360 + deg);

            } else {

                prevRotateDeg += deg;
            }

            prevRotateIndex = sectionIndex;

            enroll.rotateWheelValue = {
                transform: "rotate(" + prevRotateDeg + "deg)"
            };

            enroll.currentThemeColor = "";
            enroll.currentEmailProvider = "";
            if (emailProvider) {
                enroll.currentThemeColor = emailProvider.style['background-color'];
                enroll.currentEmailProvider = emailProvider.title;
            } else {
                enroll.currentEmailProvider = enroll.userAuthData.domainName;
            }
        };

        // OAuth classes
        enroll.oAuthClasses = constants.oAuthClasses;

        enroll.gotoHome = function () {
            return;
        };

        enroll.setProfilePicture = function (userAuthData) {

        };

        //Check email
        enroll.checkProvidedEmail = function (userAuthData) {

            var validEmailAlias;

            // invalidate email address
            userAuthData.invalidEmail = true;

            if (userAuthData.uName && userAuthData.uName.trim()) {

                // remove any @ sign if applied 
                validEmailAlias = userAuthData.uName.split('@')[0];

                if (validEmailAlias) {

                    // check domain
                    if (enroll.currentEmailProvider) {
                        userAuthData.email = userAuthData.uName.concat("@", enroll.currentEmailProvider);

                        // check email validation

                        // set valid flag on
                        userAuthData.invalidEmail = false;

                        // assume  present for now
                        enroll.showPasswordScreen = true;
                    }
                }
            }
        };

        enroll.checkPressedKey = function (app, event, isPassword) {

            if (event.which === 13) {

                var userAuthData = enroll.userAuthData;

                if (isPassword) {
                    enroll.checkPassword(app);

                } else {
                    enroll.checkProvidedEmail(userAuthData);
                }
            }
        };

        enroll.checkPassword = function (app) {

            enroll.showPasswordScreen = false;

            enroll.login(app);
        };

        function saveCurrentUser(userDetails) {
            var key = constants.authKey;

            // save new settings
            storageService.set(userDetails, key);

        }

        function gotoDashboard() {
            //// Update classes for the form elements
            //enroll.formClasses.pop();
            //enroll.oAuthClasses.pop();
            //enroll.formClasses.push("fadeOutDown");
            //enroll.oAuthClasses.push("zoomOutDown");

            // goto dashboard
            state.go("dashboard");
        }

        // Enroll user
        enroll.login = function (app) {

            var validForm = true;

            // Check valid email
            if (enroll.userAuthData.invalidEmail) {

                enroll.emailGroup.pop();
                // Add invalid class
                enroll.emailGroup.push("inValidEmail");

                validForm = false;
            }

            enroll.passwordGroup.pop();

            // Check for valid password 
            if (!enroll.userAuthData.uPassword) {
                
                // Add invalid class
                enroll.passwordGroup.push("inValidPassword");

                validForm = false;


            } else {

                enroll.showPasswordScreen = false;

                // Add invalid class
                enroll.passwordGroup.push("emptyPassword");
            }

            if (validForm) {

                // Call login
                var user = auth.login(enroll.userAuthData);

                if (user) {

                    // Set user avatar
                    app.loggedInUser = user;

                    // hide action buttons
                    app.showHideUserActions();
                    
                    // save 
                    saveCurrentUser(user);

                    // goto dashboard
                    gotoDashboard();
                }
            }
        };

        enroll.oAuthService = function (serviceProvider, app) {

            auth.oAuth(serviceProvider).then(
                function (user) {
                    if (user) {

                        // Set user avatar
                        app.loggedInUser = user;

                        // hide action buttons
                        app.showHideUserActions();

                        // save 
                        saveCurrentUser(user);

                        // goto dashboard
                        gotoDashboard();
                    }
                },
                function (error) {

                    console.log("Failed to authenticate using oAuth");
                    console.log(error);
                });
        };

        return enroll;
    };

    // Define enroll module
    angular.module("puzzler.enroll")

    // Enroll controller
    .controller("enrollController", ["$state", '$scope', '$location', 'authservice', 'constants', 'storageservice', EnrollController]);
}());