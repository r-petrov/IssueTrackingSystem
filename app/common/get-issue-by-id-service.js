/**
 * Created by PC on 06.05.2016 г..
 */
angular.module('issueTrackingSystem.common.getIssueByIdService', [])
    .factory('getIssueByIdService', [
        '$http',
        '$q',
        'BASE_URL',
        function getIssueByIdService($http, $q, BASE_URL) {
            function getIssue(issueId) {
                var deferred = $q.defer(),
                    getCurrentIssueUrl = BASE_URL + 'Issues/' + issueId;

                $http.get(getCurrentIssueUrl)
                    .then(function(currentIssue) {
                            deferred.resolve(currentIssue);
                        },
                        function(error) {
                            deferred.reject(error);
                        });

                return deferred.promise;
            }

            return {
                getIssue: getIssue
            }
        }]);