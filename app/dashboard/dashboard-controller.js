/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardController', ['ngRoute', 'issueTrackingSystem.dashboard.dashboardIssuesService'])
    .config([
        '$routeProvider',
        function($routeProvider) {
            var routeChecks = {
                isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                    if (authenticationService.isAuthenticated()) {
                        return $q.when(true);
                    }

                    return $q.reject('Unauthorized Access');
                }]
            };

            $routeProvider.when('/dashboard', {
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                resolve: routeChecks.isAuthenticated
            });
    }])
    .controller('DashboardController', [
        '$scope',
        'dashboardIssuesService',
        function DashboardController($scope, dashboardIssuesService) {
            dashboardIssuesService.getIssuesByProjects()
                .then(function(issuesByProjects) {
                    $scope.issues = [];
                    for (var key in issuesByProjects) {
                        var currentIssues = issuesByProjects[key],
                            currentProjectName = currentIssues[0].Project.Name,
                            currentIssuesByProject = {
                                projectName: currentProjectName,
                                issuesByProject: currentIssues
                            };
                        $scope.issues.push(currentIssuesByProject);
                    }
                },
                function(error) {
                    console.log(error);
                });
        }]);
