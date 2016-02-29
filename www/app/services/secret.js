(function () {
    "use strict";

    var secretService = function () {

        // Get service pointer
        var service = {};

        // create secret id
        service.generateGUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };

        // encrypt
        function encrypt(message) {

            // return value
            var encryptedMessage = CryptoJS.MD5(message);

            return encryptedMessage.toString();
        }

        // encrypted message
        service.encryptPhrase = function (phrase) {

            // nothing to work with
            if (!phrase || !phrase.toString().trim()) {
                return;
            }

            // just need string value 
            phrase = phrase.toString();

            // pick words in the phrase
            var phrases = phrase.replace(/[\t\n]/g, '').split(" ");

            // clean up phrases 
            phrases = phrases.filter(function (item) {
                return !!item && !!item.trim();
            });

            // encrypted  message to return
            var encryptedMessage = {};

            // encrypted phrases
            encryptedMessage.bundle = phrases.map(function (item) {

                // return encrypted part
                return encrypt(item);
            });

            // whole message encrypted
            encryptedMessage.encodedPhrase = encrypt(phrases.join(" "));

            // return encrypted message
            return encryptedMessage;
        };

        // Return service pointer
        return service;
    };

    // Define auth service module
    angular.module("puzzler.services")

// Adding the service
.service("secretservice", [secretService]);
}());