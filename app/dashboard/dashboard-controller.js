/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard', ['ngRoute'])
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
    .controller('DashboardController', ['$scope', 'loggedInUser', function DashboardController($scope, loggedInUser) {
        $scope.loggedInUser = loggedInUser;
    }]);
