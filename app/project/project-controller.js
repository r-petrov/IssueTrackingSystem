/**
 * Created by PC on 27.04.2016 г..
 */
angular.module('issueTrackingSystem.project.projectController', ['ngRoute', 'issueTrackingSystem.project.projectService'])
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
        'projectService',
        function ProjectController($scope, $routeParams, projectService) {
            var projectId = $routeParams.Id;
            console.log(projectId);
            projectService.getProjectById(projectId)
                .then(function(project) {
                    console.log(project);
                },
                function(error) {
                    console.log(error);
                });
        }]);