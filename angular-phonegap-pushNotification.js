/**
 * 
 * angular-phonegap-pushNotification v0.1
 * (c) 2015 Tim Rücker
 * License: Apache License
 */
(function(window) {
    window.angular.module('angular-phonegap-pushNotification', [])

            /**
             * 
             * @description The default device registration if the "device" plugin isn't installed
             * @returns {_L1._L11.Anonym$2|_L1._L16.Anonym$2}
             */
            .constant('angular-phonegap-pushNotification.defaultDevice', 'android')

            /**
             * 
             * @description The pluginmethods as factory object
             * @returns {_L1._L11.Anonym$2}
             */
            .factory('angular-phonegap-pushNotification.plugin', [
                function() {
                    var cordova = window.cordova;
                    return {
                        /**
                         * 
                         * @description Registers a Device for the PushNotifications
                         * @param {Object} options The registration options
                         * @param {Function|Undefined} successCallback
                         * @param {Function|Undefined} errorCallback
                         * @returns {undefined}
                         */
                        register: function(options, successCallback, errorCallback) {
                            successCallback = successCallback || function() {
                            };
                            errorCallback = errorCallback || function() {
                            };
                            cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
                        },
                        /**
                         * 
                         * @description Unregisters a Device from the PushNotifications
                         * @param {Function|Undefined} successCallback
                         * @param {Function|Undefined} errorCallback
                         * @returns {undefined}
                         */
                        unregister: function(successCallback, errorCallback) {
                            successCallback = successCallback || function() {
                            };
                            errorCallback = errorCallback || function() {
                            };
                            cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
                        },
                        /**
                         * 
                         * @description Sets the Apple Badgenumber
                         * @param {type} badge The Badge informations
                         * @param {Function|Undefined} successCallback
                         * @param {Function|Undefined} errorCallback
                         * @returns {undefined}
                         */
                        setApplicationIconBadgeNumber: function(badge, successCallback, errorCallback) {
                            successCallback = successCallback || function() {
                            };
                            errorCallback = errorCallback || function() {
                            };
                            cordova.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
                        }
                    };
                }
            ])

            /**
             * 
             * @description Pushmethods combined as factory
             * @param {_L1._L11.Anonym$2} plugin The Plugin Methods
             * @param {_L1._L11.Anonym$2|_L1._L16.Anonym$2} defaultDevice The Defualt device (android)
             * @returns {_L1._L51.ret}
             */
            .factory('pushNotification', [
                'angular-phonegap-pushNotification.plugin',
                'angular-phonegap-pushNotification.defaultDevice',
                function(plugin, defaultDevice) {
                    var device = window.device;
                    var cordova = window.cordova || false;//checkvariable for cordova Plugin

                    /**
                     * 
                     * @description Contains all registered EventListeners
                     * @type Array
                     */
                    var registeredFunctions = [];
                    return {
                        /**
                         * 
                         * @description Manualy calls all eventlisteners of a type
                         * @param {String} type The type of the calling listeners
                         * @param {Variable} params param for the method
                         * @returns {undefined}
                         */
                        callListener: function(type, params) {
                            for (var i in registeredFunctions) {
                                if (typeof registeredFunctions[i] !== 'undefined' && typeof registeredFunctions[i].type !== 'undefined') {
                                    if (registeredFunctions[i].type === type) {
                                        registeredFunctions[i].method(params);
                                    }
                                }
                            }
                        },
                        /**
                         * 
                         * @description Initializes the plugin with the google senderId
                         * It has top be called after "deviceready"!
                         * @param {String|Number} appid The google SenderId
                         * @returns {undefined}
                         */
                        init: function(appid) {
                            if (!cordova) {
                                alert('Cordova Plugin not found!');
                                return;
                            }
                            var self = this;
                            window.angularphonegappushNotificationonNotification = function(e) {
                                self.callListener(e.event, e);
                            };
                            window.angularphonegappushNotificationonAPNNotification = function(e) {
                                self.callListener(e.event, e);
                            };
                            var platform = typeof device !== 'undefined' ? device.platform || defaultDevice : defaultDevice;
                            //
                            //
                            platform = 'ios';

                            if (platform === 'android' || platform === 'Android') {
                                plugin.register({
                                    "senderID": appid || '',
                                    "ecb": 'angularphonegappushNotificationonNotification'
                                });
                            } else {//iphone currently not ready!!
                                plugin.register({
                                    "badge": "true",
                                    "sound": "true",
                                    "alert": "true",
                                    "ecb": "angularphonegappushNotificationonAPNNotification"
                                }, function(a) {
                                    self.callListener('registered', a);
                                });
                            }
                        },
                        /**
                         * 
                         * @description Adds a new eventlistener for a certain event type
                         * @param {String} type The type of the listener (can also be a custom listener)
                         * @param {Function} method The calling method
                         * @returns {Number} The index of the current event for delete
                         */
                        addListener: function(type, method) {
                            var newEvent = {type: type, method: method};
                            var length = registeredFunctions.lenght;
                            registeredFunctions.push(newEvent);
                            return length;
                        },
                        /**
                         * 
                         * @description Removes a event from the registeredFunctions array
                         * @param {Number} index The index of the deleting event
                         * @returns {Boolean}
                         */
                        removeListener: function(index) {
                            return delete registeredFunctions[index];
                        }
                    };
                }
            ]);
})(window);