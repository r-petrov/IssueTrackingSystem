/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.projects.projectsController',
    ['ngRoute', 'issueTrackingSystem.users.identityService', 'issueTrackingSystem.projects.projectsService'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/projects.html',
            controller: 'ProjectsController',
            resolve: {
                loggedInUser: function(identityService) {
                    return identityService.getCurrentUser();
                }
            }
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