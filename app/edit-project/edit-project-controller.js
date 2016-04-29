/**
 * Created by PC on 29.04.2016 г..
 */
angular.module('issueTrackingSystem.editProject.editProjectController', ['ngRoute', 'issueTrackingSystem.common.getProjectByIdService'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects/:Id/edit', {
            templateUrl: 'app/edit-project/edit-project.html',
            controller: 'EditProjectController',
            resolve: routeChecks.isAuthenticated
        });
    }])
    .controller('EditProjectController', [
        '$scope',
        '$routeParams',
        'getProjectByIdService',
        function EditProjectController($scope, $routeParams, getProjectByIdService) {
            var projectId = $routeParams.Id;

            getProjectByIdService.getProjectById(projectId)
                .then(function(project) {
                    console.log(project);
                    $scope.project = project.data
                })
        }]);