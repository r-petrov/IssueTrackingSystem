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
        'toastr',
        function HomeController($scope, $location, authenticationService, toastr) {
            if (authenticationService.isAuthenticated()) {
                $location.path('/dashboard');
            }

            $scope.login = function (user) {
                authenticationService.loginUser(user)
                    .then(function(loggedInUser) {
                        authenticationService.refreshCookie();
                        $location.path('/dashboard');
                        toastr.success('You successfully logged in Issue Tracking System!');
                    },
                    function(error) {
                        console.log(error);
                    });
            };

            $scope.register = function (user) {
                authenticationService.registerUser(user)
                    .then(function(loggedInUser) {
                        authenticationService.refreshCookie();
                        $location.path('/dashboard');
                        toastr.success('You successfully registered in Issue Tracking System!')
                    },
                    function(error) {
                        console.log(error);
                    });
            };
    }]);