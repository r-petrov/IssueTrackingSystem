/**
 * Created by PC on 11.04.2016 г..
 */
'use strict';
angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {
            function registerUser(user) {
                var deferred = $q.defer(),
                    registerUrl = BASE_URL + 'api/Account/Register';

                $http.post(registerUrl, user)
                    .then(function (success) {
                        loginUser(user)
                            .then(function(success) {
                                //sessionStorage.token = token;
                                deferred.resolve(success);
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
                var deffered = $q.defer(),
                    authenticationUrl = BASE_URL + 'api/Token',
                    authenticationBody = "grant_type=password&username=" + user.Email + "&password=" + user.Password,
                    config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    };

                $http.post(authenticationUrl, authenticationBody, config)
                    .then(function (success) {
                            var token = success.data.access_token;
                            deffered.resolve(token);
                        },
                        function(error) {
                            deffered.reject(error);
                        });

                return deffered.promise;
            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }])