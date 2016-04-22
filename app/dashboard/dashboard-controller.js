/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardController', ['ngRoute', 'issueTrackingSystem.dashboard.dashboardIssuesService'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController',
            resolve: {
                loggedInUser: function(identityService) {
                    return identityService.getCurrentUser();
                }
            }
        });
    }])
    .controller('DashboardController', [
        '$scope',
        'dashboardIssuesService',
        'loggedInUser',
        function DashboardController($scope, dashboardIssuesService, loggedInUser) {
            $scope.loggedInUser = loggedInUser;
            dashboardIssuesService.getIssuesByProjects()
                .then(function(issuesByProjects) {
                    $scope.issues = [];
                    for (var key in issuesByProjects) {
                        var currentIssues = issuesByProjects[key],
                            currentProjectName = currentIssues[0].Project.Name
                            currentIssuesByProject = {
                                projectName: currentProjectName,
                                issuesByProject: currentIssues
                            };
                        $scope.issues.push(currentIssuesByProject);
                    }

                    console.log($scope.issues);
                },
                function(error) {
                    console.log(error);
                });
        }]);
