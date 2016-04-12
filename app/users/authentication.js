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
                var defer = $q.defer(),
                    registerUrl = BASE_URL + 'api/Account/Register';

                $http.post(registerUrl, user)
                    .then(function(response){
                        defer.resolve(response.data);
                    },
                    function(error){
                        defer.reject(error);
                    });


                return defer.promise;
            }

            function loginUser() {

            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout
            }
        }])