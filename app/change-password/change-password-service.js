/**
 * Created by PC on 19.04.2016 г..
 */
angular.module('issueTrackingSystem.changePassword.changePasswordService', [])
    .factory('changePasswordService', [
        '$http',
        '$q',
        'BASE_URL',
        function changePasswordService($http, $q, BASE_URL) {
            function changePassword(passwordData) {
                var deffered = $q.defer(),
                    changePasswordUrl = BASE_URL + 'api/Account/ChangePassword';

                $http.post(changePasswordUrl, passwordData)
                    .then(function(success) {
                        deffered.resolve(success);
                    },
                    function(error) {
                        console.log(error);
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                changePassword: changePassword
            }
        }]);