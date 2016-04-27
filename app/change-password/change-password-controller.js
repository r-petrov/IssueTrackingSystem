/**
 * Created by PC on 19.04.2016 г..
 */
angular.module('issueTrackingSystem.changePassword.changePasswordController', ['ngRoute', 'issueTrackingSystem.changePassword.changePasswordService'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/profile/password', {
            templateUrl: 'app/change-password/change-password.html',
            controller: 'ChangePasswordController',
            resolve: routeChecks.isAuthenticated
        })
    }])
    .controller('ChangePasswordController', [
        '$scope',
        '$window',
        'changePasswordService',
        'toastr',
        function ChangePasswordController($scope, $window, changePasswordService, toastr) {
            $scope.changePassword = function(passwordData) {
                changePasswordService.changePassword(passwordData)
                    .then(function(success) {
                        $window.history.back();
                        toastr.success('You successfully changed your password!');
                    })
            }
        }]);