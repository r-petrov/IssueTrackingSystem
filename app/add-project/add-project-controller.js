/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.addProject.addProjectController', ['ngRoute', 'issueTrackingSystem.addProject.addProjectService'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects/add', {
            templateUrl: 'app/add-project/add-project.html',
            controller: 'AddProjectController',
            resolve: {
                loggedInUser: function(identityService) {
                    return identityService.getCurrentUser();
                }
            }
        });
    }])
    .controller('AddProjectController', [
        '$scope',
        'addProjectService',
        function AddProjectController($scope, addProjectService) {
            $scope.addProject = function(project) {
                addProjectService.addProject(project)
                    .then(function(addedProject) {
                        console.log(addedProject);
                        $window.history.back();
                    },
                    function(error) {
                        console.log(error);
                    })
            }
        }]);