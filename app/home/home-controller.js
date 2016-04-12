/**
 * Created by PC on 11.04.2016 г..
 */
'use strict';
angular.module('issueTrackingSystem.home', [
        'ngRoute',
        'issueTrackingSystem.users.authentication'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', ['$scope', 'authentication', function ($scope, authentication) {
        $scope.login = function (user) {
            authentication.loginUser(user);
        };

        $scope.register = function (user) {
            authentication.registerUser(user)
                .then(function(registeredUser) {
                });
        };
    }]);