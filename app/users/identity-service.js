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

            function removeCurrentUser() {
                currentUser = undefined;
            }

            function requestUserProfile() {
                var userProfileDeferred = $q.defer();

                $http.get(BASE_URL + 'Users/me')
                    .then(function (loggedInUser) {
                            currentUser = loggedInUser;
                            deferred.resolve(currentUser);
                            userProfileDeferred.resolve();
                        },
                        function (error) {
                            deferred.reject(error);
                            $location.path('/');
                        });

                return userProfileDeferred.promise;
            }

            return {
                getCurrentUser: getCurrentUser,
                removeCurrentUser: removeCurrentUser,
                requestUserProfile: requestUserProfile,
            }
        }]);