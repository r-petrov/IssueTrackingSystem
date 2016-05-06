/**
 * Created by PC on 05.05.2016 г..
 */
angular.module('issueTrackingSystem.issue.issueController', ['ngRoute', 'issueTrackingSystem.issue.issueService'])
    .config(['$routeProvider',
        function($routeProvider) {
            var routeChecks = {
                isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                    if (authenticationService.isAuthenticated()) {
                        return $q.when(true);
                    }

                    return $q.reject('Unauthorized Access');
                }]
            };

            $routeProvider.when('/issues/:Id', {
                templateUrl: 'app/issue/issue.html',
                controller: 'IssueController',
                resolve: routeChecks.isAuthenticated
            })
        }])
    .controller('IssueController', [
        '$scope',
        '$routeParams',
        '$route',
        'issueService',
        function IssueController($scope, $routeParams, $route, issueService) {
            var issueId = $routeParams.Id;

            issueService.getCurrentIssue(issueId)
                .then(function(currentIssue) {
                    console.log(currentIssue);
                    $scope.issue = currentIssue.data;
                });

            issueService.getComments(issueId)
                .then(function(comments) {
                    console.log(comments);
                    $scope.comments = comments.data;
                },
                function(error) {
                    console.log(error);
                });

            $scope.addComment = function(newComment) {
                if (newComment) {
                    issueService.addComment(issueId, newComment)
                        .then(function(allComments) {
                            console.log(allComments);
                            $route.reload();
                        })
                }
                else {
                    toastr.error('You should type a comment first!');
                }
            };

            $scope.changeStatus = function(newStatus) {
                console.log(newStatus);
                issueService.changeStatus(issueId, newStatus)
                    .then(function(newAvailableStatuses) {
                        console.log(newAvailableStatuses);
                        $route.reload();
                    },
                    function(error) {
                        console.log(error);
                    });
            }
        }
    ]);
