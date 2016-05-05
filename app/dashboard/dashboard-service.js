/**
 * Created by PC on 15.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardService', [])
    .factory('dashboardService', [
        '$http',
        '$q',
        'BASE_URL',
        function dashboardService($http, $q, BASE_URL) {
            function getAssigneeUsersIssues(pageSize) {
                var deferred = $q.defer(),
                    currentPageSize = pageSize || 140,
                    assigneeUsersIssuesUrl = BASE_URL + 'Issues/me?pageSize=' + currentPageSize + '&pageNumber=1&orderBy=Project.Name';

                $http.get(assigneeUsersIssuesUrl)
                    .then(function(assigneeUsersIssues) {
                            deferred.resolve(assigneeUsersIssues);
                        },
                        function(error) {
                            console.log(error);
                            deferred.reject(error);
                        });

                return deferred.promise;
            }

            return {
                getAssigneeUsersIssues: getAssigneeUsersIssues
            }
        }]);