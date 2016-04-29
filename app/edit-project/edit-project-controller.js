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
        'editProjectService',
        function EditProjectController($scope, $routeParams, getProjectByIdService, editProjectService) {
            var projectId = $routeParams.Id;

            getProjectByIdService.getProjectById(projectId)
                .then(function(project) {
                    $scope.project = project.data;
                    $scope.editProject = function(project) {
                        console.log(project);

                        editProjectService.editProject(projectId, project)
                            .then(function(success) {
                                console.log(success);
                                $scope.back();
                            },
                            function(error) {
                                console.log(error);
                            })
                    }
                })
        }]);