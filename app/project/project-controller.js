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
        function ProjectController($scope, $routeParams, projectService, projectIssuesService) {
            var projectId = $routeParams.Id;
            projectService.getProjectById(projectId)
                .then(function(project) {
                    console.log(project);
                    $scope.project = project.data;
                },
                function(error) {
                    console.log(error);
                });

            projectIssuesService.getProjectIssues(projectId)
                .then(function(projectIssues) {
                    console.log('projectIssues:');
                    console.log(projectIssues);
                    $scope.issues = projectIssues.data.Issues;
                },
                function(error) {
                    console.log(error);
                });

        }]);