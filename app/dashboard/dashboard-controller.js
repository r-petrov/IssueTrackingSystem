/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.dashboard', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardController'
        })
    }])
    .controller('DashboardController', ['$scope', function DashboardController($scope) {

    }])
