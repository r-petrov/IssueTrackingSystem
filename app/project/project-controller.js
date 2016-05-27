/**
 * Created by PC on 27.04.2016 г..
 */
angular.module('issueTrackingSystem.project.projectController', ['ngRoute', 'issueTrackingSystem.common.getProjectByIdService', 'issueTrackingSystem.project.projectIssuesService'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects/:Id', {
            templateUrl: 'app/project/project.html',
            controller: 'ProjectController',
            resolve: routeChecks.isAuthenticated
        });
    }])
    .controller('ProjectController', [
        '$scope',
        '$routeParams',
        'getProjectByIdService',
        'projectIssuesService',
        'PAGE_SIZE',
        'MAX_SIZE',
        function ProjectController($scope, $routeParams, getProjectByIdService, projectIssuesService, PAGE_SIZE, MAX_SIZE) {
            var projectId = $routeParams.Id;
            $scope.pageSize = {
                itemsPerPage: PAGE_SIZE
            };
            $scope.maxSize = {
                paginationSize: MAX_SIZE
            };
            $scope.currentPage = {
                projectsIssuesPage: 1,
                allIssuesPage: 1
            };
            $scope.totalItems = {
                projectsIssuesCount: 0,
                allIssuesCount: 0
            };

            getProjectByIdService.getProjectById(projectId)
                .then(function(project) {
                    console.log(project.data);
                    $scope.project = {
                        currentProject: project.data
                    };
                },
                function(error) {
                    console.log(error);
                });

            $scope.setProjectPage = {
                setProjectsIssues: function() {
                    projectIssuesService.getProjectIssues(projectId, $scope.pageSize.itemsPerPage, $scope.currentPage.projectsIssuesPage)
                        .then(function(projectIssues) {
                                console.log(projectIssues);
                                $scope.totalItems.projectsIssuesCount = projectIssues.data.TotalCount;
                                $scope.issues = {
                                    projectsIssues: projectIssues.data.Issues
                                };
                            },
                            function(error) {
                                console.log(error);
                            });
                },
                setAllIssues: function() {
                    projectIssuesService.getAllIssues(projectId, $scope.pageSize.itemsPerPage, $scope.currentPage.allIssuesPage)
                        .then(function(allIssues) {
                                console.log(allIssues);
                                $scope.totalItems.allIssuesCount = allIssues.data.TotalCount;
                                $scope.allIssues = {
                                    allIssues: allIssues.data.Issues
                                };
                            },
                            function(error) {
                                console.log(error);
                            });
                }
            };

            $scope.setProjectPage.setProjectsIssues();

            $scope.setProjectPage.setAllIssues();
        }]);