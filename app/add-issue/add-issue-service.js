/**
 * Created by PC on 03.05.2016 г..
 */
angular.module('issueTrackingSystem.addIssue.addIssueService', [])
    .factory('addIssueService', [
        '$http',
        '$q',
        'BASE_URL',
        'createIssueRequestBodyService',
        function addIssueService($http, $q, BASE_URL, createIssueRequestBodyService) {
            function addIssue(issue) {
                var deferred = $q.defer(),
                    addIssueUrl = BASE_URL + 'Issues/',
                    requestBody = createIssueRequestBodyService.createIssueRequestBody(issue);

                console.log(issue.PriorityId);

                $http.post(addIssueUrl, requestBody)
                    .then(function(issue) {
                        console.log(issue);
                        deferred.resolve(issue);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                addIssue: addIssue
            }
        }]);