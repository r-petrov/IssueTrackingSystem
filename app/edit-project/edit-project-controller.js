/**
 * Created by PC on 29.04.2016 г..
 */
angular.module('issueTrackingSystem.editProject.editProjectController', ['ngRoute', 'issueTrackingSystem.common.getProjectByIdService', 'issueTrackingSystem.editProject.transformCollectionsService'])
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
        'transformCollectionsService',
        function EditProjectController($scope, $routeParams, getProjectByIdService, editProjectService, transformCollectionsService) {
            var projectId = $routeParams.Id;

            getProjectByIdService.getProjectById(projectId)
                .then(function(project) {
                    project = transformCollectionsService.transformCollections(project);
                    $scope.project = project.data;

                    $scope.editProject = function(project) {
                        if (project.Name && project.Description && project.LeadId) {
                            editProjectService.editProject(projectId, project)
                                .then(function(editedProject) {
                                        console.log(editedProject);
                                        $scope.back();
                                    },
                                    function(error) {
                                        console.log(error);
                                    })
                        }
                        else {
                            toastr.error('Project Name, Project Description and Project LeadId are mandatory fields!');
                        }
                    }
                })
        }]);