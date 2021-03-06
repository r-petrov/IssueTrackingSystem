/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.addProject.addProjectController', ['ngRoute', 'issueTrackingSystem.addProject.addProjectService'])
    /*.config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects/add', {
            templateUrl: 'app/add-project/add-project.html',
            controller: 'AddProjectController',
            resolve:  routeChecks.isAuthenticated
        });
    }])*/
    .controller('AddProjectController', [
        '$scope',
        '$uibModalInstance',
        'addProjectService',
        function AddProjectController($scope, $uibModalInstance, addProjectService) {
            $scope.addProject = function(project) {
                console.log(project);
                if (project.Name && project.Description && project.ProjectKey && project.LeadId && project.Priorities) {
                    addProjectService.addProject(project)
                        .then(function(addedProject) {
                                $uibModalInstance.close(addedProject);
                            },
                            function(error) {
                                console.log(error);
                            })
                }
                else {
                    toastr.error('Project Name, Project Description, Project Key and Project LeadId are mandatory fields!');
                }
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
        }]);