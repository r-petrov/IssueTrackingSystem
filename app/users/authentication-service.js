/**
 * Created by PC on 11.04.2016 г..
 */
'use strict';
angular.module('issueTrackingSystem.users.authenticationService', [])
    .factory('authenticationService', [
        '$http',
        '$q',
        'BASE_URL',
        function authenticationService($http, $q, BASE_URL) {
            function registerUser(user) {
                var deferred = $q.defer(),
                    registerUrl = BASE_URL + 'api/Account/Register';

                $http.post(registerUrl, user)
                    .then(function (success) {
                        loginUser(user)
                            .then(function(accessToken) {
                                //sessionStorage.token = token;
                                deferred.resolve(accessToken);
                                console.log(accessToken);
                            },
                            function(error) {
                                console.log(error.message);
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
                            deferred.resolve(accessToken);
                        },
                        function(error) {
                            deferred.reject(error);
                        });

                return deferred.promise;
            }

            function logout(currentUser) {
                var deferred = $q.defer(),
                    logoutUrl = BASE_URL + 'api/Account/Logout';


                $http.post(logoutUrl, currentUser)
                    .then(function(success) {
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
                logout: logout
            }
        }]);