/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.common.getUsersService', [])
    .factory('getUsersService', [
        '$http',
        '$q',
        'BASE_URL',
        function getUsersService($http, $q, BASE_URL) {
            function getUsers() {
                var deffered = $q.defer(),
                    getUsersUrl = BASE_URL + 'users';

                $http.get(getUsersUrl)
                    .then(function(users) {
                        deffered.resolve(users);
                    },
                    function(error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                getUsers: getUsers
            }
        }
    ]);