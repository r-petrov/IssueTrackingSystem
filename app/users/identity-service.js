/**
 * Created by PC on 15.04.2016 г..
 */
angular.module('issueTrackingSystem.users.identityService', [])
    .factory('identityService', [
        '$cookies',
        '$http',
        '$q',
        '$location',
        'BASE_URL',
        function identityService($cookies, $http, $q, $location, BASE_URL) {
            var deferred = $q.defer(),
                currentUser = undefined,
                accessToken = $cookies.get('accessToken');

            function getCurrentUser() {
                if (currentUser) {
                    return $q.when(currentUser);
                }
                else {
                    return deferred.promise;
                }
            }

            function isAuthenticated() {
                return !!accessToken;
            }

            if (accessToken) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
            }

            $http.get(BASE_URL + 'Users/me')
                .then(function (loggedInUser) {
                        deferred.resolve(loggedInUser);
                    },
                    function (error) {
                        deferred.reject(error);
                        $location.url('/');
                    });

            return {
                getCurrentUser: getCurrentUser,
                isAuthenticated: isAuthenticated,
            }
        }]);