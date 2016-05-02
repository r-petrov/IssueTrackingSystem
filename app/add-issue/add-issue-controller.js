/**
 * Created by PC on 02.05.2016 г..
 */
angular.module('issueTrackingSystem.addIssue.addIssueController', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects/:Id/add-issue', {
            templateUrl: 'app/add-issue/add-issue.html',
            controller: 'AddIssueController',
            resolve: routeChecks.isAuthenticated
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        'getProjectByIdService',
        'getProjectsService',
        function AddIssueController($scope, $routeParams, getProjectByIdService, getProjectsService) {
            var projectId = $routeParams.Id;
            getProjectByIdService.getProjectById(projectId)
                .then(function(project) {
                    $scope.projectName = project.data.Name;
                    $scope.priorities = project.data.Priorities;
                },
                function(error) {
                    console.log(error);
                });

            getProjectsService.getProjects()
                .then(function(projects) {
                    console.log(projects);
                    $scope.projects = projects.data;
                });
        }]);