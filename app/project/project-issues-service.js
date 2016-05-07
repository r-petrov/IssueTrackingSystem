/**
 * Created by PC on 28.04.2016 г..
 */
angular.module('issueTrackingSystem.project.projectIssuesService', [])
    .factory('projectIssuesService', [
        '$http',
        '$q',
        'BASE_URL',
        function projectIssuesService($http, $q, BASE_URL) {
            function getProjectIssues(projectId, pageSize) {
                var deferred = $q.defer(),
                    currentPageSize = pageSize || 140,
                    projectIssuesUrl = BASE_URL + 'Issues/?pageSize=' + currentPageSize + '&pageNumber=1&filter=Project.Id=' + projectId;

                $http.get(projectIssuesUrl)
                    .then(function(projectIssues) {
                        console.log(projectIssues);
                        deferred.resolve(projectIssues);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getProjectIssues: getProjectIssues
            }
        }]);