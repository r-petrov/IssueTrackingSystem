/**
 * Created by PC on 06.05.2016 г..
 */
angular.module('issueTrackingSystem.editIssue.editIssueService', ['issueTrackingSystem.common.createIssueRequestBodyService'])
    .factory('editIssueService', [
        '$http',
        '$q',
        'BASE_URL',
        'createIssueRequestBodyService',
        function editIssueService($http, $q, BASE_URL, createIssueRequestBodyService){
            function editIssue(issueId, issue) {
                var deferred = $q.defer(),
                    editIssueUrl = BASE_URL + 'Issues/' + issueId,
                    requestBody = createIssueRequestBodyService.createIssueRequestBody(issue);

                delete requestBody.ProjectId;

                $http.put(editIssueUrl, requestBody)
                    .then(function(editedIssue) {
                        deferred.resolve(editedIssue);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                editIssue: editIssue
            }
        }]);