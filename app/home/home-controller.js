/**
 * Created by PC on 11.04.2016 г..
 */
'use strict';
angular.module('issueTrackingSystem.home', [
        'ngRoute',
        'issueTrackingSystem.users.authenticationService'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeController'
        })
    }])
    .controller('HomeController', [
        '$scope',
        '$location',
        'authenticationService',
        function HomeController($scope, $location, authenticationService) {

            if (authenticationService.isAuthenticated()) {
                $location.path('/dashboard');
            }

            $scope.login = function (user) {
                authenticationService.loginUser(user)
                    .then(function(loggedInUser) {
                        $location.path('/dashboard');
                    },
                    function(error) {
                        console.log('You entered incorrect email or password!');
                    });
            };

            $scope.register = function (user) {
                authenticationService.registerUser(user)
                    .then(function(loggedInUser) {
                        $location.path('/dashboard');
                    },
                    function(error) {
                        console.log(error);
                    });
            };
    }]);