/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.projects.projectsController',
    ['ngRoute', 'issueTrackingSystem.users.identityService', 'issueTrackingSystem.projects.projectsService'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/projects.html',
            controller: 'ProjectsController',
            resolve: routeChecks.isAuthenticated
        });

    }])
    .controller('ProjectsController', [
        '$scope',
        'projectsService',
        function($scope, projectsService) {
            projectsService.getProjects()
                .then(function(projects) {
                    $scope.projects = projects.data;
                })
        }]);