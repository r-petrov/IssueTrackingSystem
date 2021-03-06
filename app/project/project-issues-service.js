/**
 * Created by PC on 28.04.2016 г..
 */
angular.module('issueTrackingSystem.project.projectIssuesService', [])
    .factory('projectIssuesService', [
        '$http',
        '$q',
        'BASE_URL',
        function projectIssuesService($http, $q, BASE_URL) {
            function getProjectIssues(projectId, pageSize, currentPage) {
                var deferred = $q.defer(),
                    currentPageSize = pageSize || 140,
                    currentPageNumber = currentPage || 1,
                    getProjectIssuesUrl = BASE_URL + 'Issues/?pageSize=' + currentPageSize + '&pageNumber=' + currentPageNumber + '&filter=Project.Id=' + projectId;

                $http.get(getProjectIssuesUrl)
                    .then(function(projectIssues) {
                        console.log(projectIssues);
                        deferred.resolve(projectIssues);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAllIssues(projectId, pageSize, pageNumber) {
                var deferred = $q.defer(),
                    currentPageSize = pageSize || 1000,
                    currentPageNumber = pageNumber || 1000,
                    getAllIssuesUrl = BASE_URL + 'Issues/?pageSize=' + currentPageSize + '&pageNumber=' + currentPageNumber + '&filter=';
                    //getAllIssuesUrl = BASE_URL + 'Projects/' + projectId + '/Issues';

                $http.get(getAllIssuesUrl)
                    .then(function(allIssues) {
                        console.log(allIssues);
                        deferred.resolve(allIssues);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getProjectIssues: getProjectIssues,
                getAllIssues: getAllIssues
            }
        }]);