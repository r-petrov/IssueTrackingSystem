/**
 * Created by PC on 11.04.2016 г..
 */
'use strict'
angular.module('issueTrackingSystem.home', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', ['$scope', function($scope) {
        $scope.hello = 'Zdrasti';
    }])