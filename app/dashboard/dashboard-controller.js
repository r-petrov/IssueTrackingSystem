/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardController', ['ngRoute', 'issueTrackingSystem.dashboard.dashboardIssuesService', 'issueTrackingSystem.dashboard.dashboardAssociatedProjectsService'])
    .config([
        '$routeProvider',
        function($routeProvider) {
            var routeChecks = {
                isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                    if (authenticationService.isAuthenticated()) {
                        return $q.when(true);
                    }

                    return $q.reject('Unauthorized Access');
                }]
            };

            $routeProvider.when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                resolve: routeChecks.isAuthenticated
            });
    }])
    .controller('DashboardController', [
        '$scope',
        'dashboardService',
        'dashboardIssuesService',
        'dashboardAssociatedProjectsService',
        'PAGE_SIZE',
        'MAX_SIZE',
        function DashboardController($scope, dashboardService, dashboardIssuesService, dashboardAssociatedProjectsService, PAGE_SIZE, MAX_SIZE) {
            $scope.pageSize = {
                itemsPerPage: PAGE_SIZE
            };
            $scope.maxSize = {
                paginationSize: MAX_SIZE
            };
            $scope.currentPage = {
                issuesPage: 1,
                projectsPage: 1
            };
            $scope.totalItems = {
                issuesCount: 0,
                projectsCount: 0
            };
            $scope.setDashboardPage = {
                setIssuesPanel: function() {
                    dashboardService.getAssigneeUsersIssues($scope.pageSize.itemsPerPage, $scope.currentPage.issuesPage)
                        .then(function(assigneeUsersIssues) {
                                if (assigneeUsersIssues.data.Issues.length > 0) {
                                    //$scope.numberOfPages = assigneeUsersIssues.data.TotalPages;
                                    var issuesByProjects = dashboardIssuesService.getIssuesByProjects(assigneeUsersIssues);
                                    $scope.totalItems.issuesCount = assigneeUsersIssues.data.TotalCount;
                                    $scope.issues = {
                                        assigneeUsersIssues: []
                                    };
                                    if (issuesByProjects.length > 0) {
                                        for (var key in issuesByProjects) {
                                            var currentIssues = issuesByProjects[key],
                                                currentProjectId = currentIssues[0].Project.Id,
                                                currentProjectName = currentIssues[0].Project.Name,
                                                currentIssuesByProject = {
                                                    projectId: currentProjectId,
                                                    projectName: currentProjectName,
                                                    issuesByProject: currentIssues
                                                };
                                            $scope.issues.assigneeUsersIssues.push(currentIssuesByProject);
                                        }
                                    }
                                }
                            },
                            function(error) {
                                console.log(error);
                            });
                },
                setProjectsPanel: function() {
                    dashboardAssociatedProjectsService.getAssociatedProjects($scope.pageSize.itemsPerPage, $scope.currentPage.projectsPage)
                        .then(function(associatedProjects) {
                            if (associatedProjects.data.Projects.length > 0) {
                                console.log(associatedProjects);
                                $scope.associatedProjects = {
                                    associatedUsersProjects: associatedProjects.data.Projects
                                };
                                //$scope.numberOfProjectsPages = associatedProjects.data.TotalPages;
                                $scope.totalItems.projectsCount = associatedProjects.data.TotalCount;
                            }
                        });
                }
            };

            /*$scope.setIssues = function() {
                dashboardService.getAssigneeUsersIssues($scope.pageSize.itemsPerPage, $scope.currentPage.issuesPage)
                    .then(function(assigneeUsersIssues) {
                            if (assigneeUsersIssues.data.Issues.length > 0) {
                                //$scope.numberOfPages = assigneeUsersIssues.data.TotalPages;
                                var issuesByProjects = dashboardIssuesService.getIssuesByProjects(assigneeUsersIssues);
                                $scope.totalItems.issuesCount = assigneeUsersIssues.data.TotalCount;
                                $scope.issues = {
                                    assigneeUsersIssues: []
                                };
                                if (issuesByProjects.length > 0) {
                                    for (var key in issuesByProjects) {
                                        var currentIssues = issuesByProjects[key],
                                            currentProjectId = currentIssues[0].Project.Id,
                                            currentProjectName = currentIssues[0].Project.Name,
                                            currentIssuesByProject = {
                                                projectId: currentProjectId,
                                                projectName: currentProjectName,
                                                issuesByProject: currentIssues
                                            };
                                        $scope.issues.assigneeUsersIssues.push(currentIssuesByProject);
                                    }
                                }
                            }
                        },
                        function(error) {
                            console.log(error);
                        });
            };*/

            $scope.setDashboardPage.setIssuesPanel();

            //$scope.$watch('currentPage', $scope.setPage);

            /*$scope.setProjectsPanelPage = function() {
                dashboardAssociatedProjectsService.getAssociatedProjects($scope.pageSize.itemsPerPage, $scope.currentPage.projectsPage)
                    .then(function(associatedProjects) {
                        if (associatedProjects.data.Projects.length > 0) {
                            console.log(associatedProjects);
                            $scope.associatedProjects = {
                                associatedUsersProjects: associatedProjects.data.Projects
                            };
                            //$scope.numberOfProjectsPages = associatedProjects.data.TotalPages;
                            $scope.totalItems.projectsCount = associatedProjects.data.TotalCount;
                        }
                    });
            };*/

            $scope.setDashboardPage.setProjectsPanel();

            //$scope.$watch('currentPage', $scope.setProjectsPanelPage);
        }]);
