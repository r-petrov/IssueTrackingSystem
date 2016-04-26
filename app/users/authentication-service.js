/**
 * Created by PC on 11.04.2016 г..
 */
'use strict';
angular.module('issueTrackingSystem.users.authenticationService', [])
    .factory('authenticationService', [
        '$http',
        '$q',
        '$cookies',
        'identityService',
        'BASE_URL',
        function authenticationService($http, $q, $cookies, identityService, BASE_URL) {
            var AUTHENTICATION_COOKIE_KEY = 'AUTHENTICATION_COOKIE_KEY';

            function registerUser(user) {
                var deferred = $q.defer(),
                    registerUrl = BASE_URL + 'api/Account/Register';

                $http.post(registerUrl, user)
                    .then(function (success) {
                        loginUser(user)
                            .then(function(loggedInUser) {
                                //sessionStorage.token = token;
                                deferred.resolve(loggedInUser);
                            },
                            function(error) {
                                console.log(error);
                            });

                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer(),
                    authenticationUrl = BASE_URL + 'api/Token',
                    authenticationBody = "grant_type=password&username=" + user.Email + "&password=" + user.Password,
                    config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };

                $http.post(authenticationUrl, authenticationBody, config)
                    .then(function (loggedInUser) {
                            var accessToken = loggedInUser.data.access_token;

                            $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                            $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
                            identityService.requestUserProfile()
                                .then(function(success) {
                                    deferred.resolve(loggedInUser.data);
                                },
                                function(error) {
                                    console.log(error);
                                })

                        },
                        function(error) {
                            deferred.reject(error);
                        });

                return deferred.promise;
            }

            function isAuthenticated() {
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);
            }

            function refreshCookie() {
                //var isAuthenticated = isAuthenticated();
                if (isAuthenticated()) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + $cookies.get(AUTHENTICATION_COOKIE_KEY);
                    identityService.requestUserProfile()
                        .then(function(success) {
                            console.log(success);
                        });
                }
            }

            function logout(currentUser) {
                var deferred = $q.defer(),
                    logoutUrl = BASE_URL + 'api/Account/Logout';


                $http.post(logoutUrl, currentUser)
                    .then(function(success) {
                        $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                        $http.defaults.headers.common.Authorization = undefined;
                        identityService.requestUserProfile();
                        deferred.resolve(success);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                isAuthenticated: isAuthenticated,
                refreshCookie: refreshCookie,
                logout: logout
            }
        }]);