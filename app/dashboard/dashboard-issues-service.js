/**
 * Created by PC on 21.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardIssuesService', [])
    .factory('dashboardIssuesService', [
        '$q',
        'dashboardService',
        function dashboardIssuesService($q, dashboardService) {
            var deferred = $q.defer();

            function getIssuesByProjects() {
                dashboardService.getAssigneeUsersIssues()
                    .then(function(response) {
                            var i,
                                previousIssue,
                                currentIssue,
                                projectIssues = [],
                                issuesByProjects = [],
                                issues = response.data.Issues,
                                issuesLength = issues.length;

                            previousIssue = issues[0];
                            projectIssues.push(previousIssue);
                            for (i = 1; i < issuesLength; i++) {
                                currentIssue = issues[i];
                                if (currentIssue.Project.Name === previousIssue.Project.Name) {
                                    projectIssues.push(currentIssue);
                                }
                                else {
                                    projectIssues.sort(function(a, b) {
                                        return new Date(b.DueDate) - new Date(a.DueDate);
                                    });

                                    issuesByProjects.push(projectIssues);
                                    projectIssues = [];
                                    projectIssues.push(currentIssue);
                                }

                                previousIssue = currentIssue;
                                if (i=== issues.length - 1) {
                                    projectIssues.sort(function(a, b) {
                                        return new Date(b.DueDate) - new Date(a.DueDate);
                                    });

                                    issuesByProjects.push(projectIssues);
                                }
                            }

                            deferred.resolve(issuesByProjects);
                        },
                        function(error) {
                            deferred.reject(error);
                        });

                return deferred.promise;
            }

            return {
                getIssuesByProjects: getIssuesByProjects
            }
        }]);