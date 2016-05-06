/**
 * Created by PC on 06.05.2016 г..
 */
angular.module('issueTrackingSystem.editIssue.editIssueController', ['ngRoute', 'issueTrackingSystem.common.getIssueByIdService', 'issueTrackingSystem.common.getProjectByIdService', 'issueTrackingSystem.editIssue.editIssueService'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/issues/:Id/edit', {
            templateUrl: 'app/edit-issue/edit-issue.html',
            controller: 'EditIssueController',
            resolve: routeChecks.isAuthenticated
        });
    }])
    .controller('EditIssueController', [
        '$scope',
        '$routeParams',
        'getIssueByIdService',
        'getProjectByIdService',
        'editIssueService',
        function EditIssueController($scope, $routeParams, getIssueByIdService, getProjectByIdService, editIssueService) {
            var issueId = $routeParams.Id;
            getIssueByIdService.getIssue(issueId)
                .then(function(issue) {
                    var issueId = issue.data.Id;
                    $scope.issue = issue.data;
                    getProjectByIdService.getProjectById(issue.data.Project.Id)
                        .then(function(project) {
                            $scope.priorities = project.data.Priorities;

                            $scope.editIssue = function(issue) {
                                editIssueService.editIssue(issueId, issue)
                                    .then(function(editedIssue) {
                                        console.log(editedIssue);
                                        $scope.back();
                                    },
                                    function(error) {
                                        console.log(error);
                                    })
                            }
                        });

                });
        }]);