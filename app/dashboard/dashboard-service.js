/**
 * Created by PC on 15.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardService', [])
    .factory('dashboardService', [
        '$http',
        '$q',
        'BASE_URL',
        function dashboardService($http, $q, BASE_URL) {
            function getAssigneeUsersIssues(pageSize, pageNumber) {
                var deferred = $q.defer(),
                    currentPageSize = pageSize || 140,
                    currentPageNumber = pageNumber || 1,
                    assigneeUsersIssuesUrl = BASE_URL + 'Issues/me?pageSize=' + currentPageSize + '&pageNumber=' + currentPageNumber + '&orderBy=Project.Name';

                $http.get(assigneeUsersIssuesUrl)
                    .then(function(assigneeUsersIssues) {
                            deferred.resolve(assigneeUsersIssues);
                        },
                        function(error) {
                            deferred.reject(error);
                        });

                return deferred.promise;
            }

            return {
                getAssigneeUsersIssues: getAssigneeUsersIssues
            }
        }]);