/**
 * Created by PC on 21.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardIssuesService', [])
    .factory('dashboardIssuesService', [
        '$q',
        'dashboardService',
        function dashboardIssuesService($q, dashboardService) {
            var deferred = $q.defer();

            function getIssuesByProjects(assigneeUsersIssues) {
                var i,
                    previousIssue,
                    currentIssue,
                    projectIssues = [],
                    issuesByProjects = [],
                    issues = assigneeUsersIssues.data.Issues,
                    issuesLength = issues.length;

                if (issuesLength > 1) {
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
                        if (i === issues.length - 1) {
                            projectIssues.sort(function(a, b) {
                                return new Date(b.DueDate) - new Date(a.DueDate);
                            });

                            issuesByProjects.push(projectIssues);
                        }
                    }
                }
                else {
                    projectIssues.push(issues[0]);
                    issuesByProjects.push(projectIssues);
                }

                return issuesByProjects;

                /*dashboardService.getAssigneeUsersIssues()
                    .then(function(response) {
                            var i,
                                previousIssue,
                                currentIssue,
                                projectIssues = [],
                                issuesByProjects = [],
                                issues = response.data.Issues,
                                issuesLength = issues.length;
                            console.log(issuesLength);

                            if (issuesLength > 1) {
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
                                    if (i === issues.length - 1) {
                                        projectIssues.sort(function(a, b) {
                                            return new Date(b.DueDate) - new Date(a.DueDate);
                                        });

                                        issuesByProjects.push(projectIssues);
                                    }
                                }
                            }
                            else {
                                projectIssues.push(issues[0]);
                                issuesByProjects.push(projectIssues);
                            }


                            deferred.resolve(issuesByProjects);
                        },
                        function(error) {
                            deferred.reject(error);
                        });

                return deferred.promise;*/
            }

            return {
                getIssuesByProjects: getIssuesByProjects
            }
        }]);