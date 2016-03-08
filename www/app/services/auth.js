(function () {
    "use strict";

    /*
       Authorization constructor:
      1. location object {$location} to provide redirections
      2. defer object {$q} for returning promises for api calls 
     */
    var authService = function ($q, constants, storageService) {

        // Get service pointer
        var service = this;

        // Other local variables
        var oAuthToken = "la2yEcwv1lz_UnaWPgTdXAzA1jg";

        // internal storage auth key
        var authKey = constants.authKey;

        /*
         * Login method:
         * 1. User details {name: ABC, password: ***}
         * 2. Other details [enableCache...]
         */
        service.login = function (userAuthData) {

            // Get previous user data from local storage
            if (localStorage) {

                // Temp data base
                var email = userAuthData.email.toLowerCase(),
                    uPassword = localStorage.getItem(email);

                // If user is enrolled and wrong password
                if (!!uPassword && uPassword !== userAuthData.uPassword) {
                    return false;
                }

                // update password
                localStorage.setItem(email, userAuthData.uPassword);

                return {
                    name: userAuthData.uName,
                    avatar: userAuthData.uploadedIconUrl || userAuthData.rawFileUrl,
                    isLoggedIn: true,
                    isOAuth: false,
                    email: email
                };
            }

            return false;
        };

        /*
         * oAuth login:
         * 1. OAuthProvider: google, facebook, or other provider
         */
        service.oAuth = function (oAuthProvider) {

            // Check if oAuth service is available
            if (!OAuth || !OAuth.getVersion()) {
                console.log("oAuth is not functioning as expected");
                return false;
            }

            // Deferred response object
            var oAuthResponse = $q.defer();

            // Initialize the oAuth connection
            OAuth.initialize(oAuthToken);

            // Open browser window
            OAuth.popup(oAuthProvider, {
                cache: true
            }).done(function (result) {

                // Call api method to get user details
                result.me().done(function (response) {

                    if (!!response.id) {

                        // Add dummy user data
                        response.isOAuth = true;
                        response.isLoggedIn = true;

                        oAuthResponse.resolve(response);
                    } else {
                        oAuthResponse.reject(response);
                    }
                }).fail(function (error) {
                    // Error at the oAuth api level
                    oAuthResponse.reject(error);
                });

            }).fail(function (error) {
                // Error at auth provider level
                oAuthResponse.reject(error);
            });

            // return the promise 
            return oAuthResponse.promise;

        };

        // Logout method
        service.logout = function () {
            return;
        };

        service.setUserDetails = function (userDetails) {

            if (!userDetails) {
                return;
            }

            // update user's avatar 
            if (userDetails.avatar) {

                // create key
                var avatarKey = authKey.concat(userDetails.email ? userDetails.email.toLowerCase() : "no_email");

                //set data
                storageService.set(userDetails.avatar, avatarKey);
            }

            // save all current session details
            storageService.set(userDetails, authKey);
        };

        // get user details
        service.getUserDetails = function (email) {

            email = email ? email.toLowerCase() : "no_email";

            var userDetails = storageService.get(authKey);

            if (userDetails && userDetails.email === email) {
                return userDetails;
            }
        };

        // get user's last saved avatar
        service.getUserAvatar = function (email) {

            var avatarKey = authKey.concat(email ? email.toLowerCase() : "no_email");

            return storageService.get(avatarKey);
        }

        // Return service pointer
        return service;
    };

    // Define auth service module
    angular.module("puzzler.services")

// Adding the service
.service("authservice", ["$q", "constants", "storageservice", authService]);
}());