/**
 * Created by PC on 19.04.2016 г..
 */
angular.module('issueTrackingSystem.changePassword.changePasswordController', [])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/change-password/change-password.html',
            controller: 'ChangePasswordController',
            resolve: {
                loggedInUser: function(identityService) {
                    return identityService.getCurrentUser();
                }
            }
        })
    }])
    .controller('ChangePasswordController', [
        '$scope',
        '$window',
        'changePasswordService',
        function ChangePasswordController($scope, $window, changePasswordService) {
            $scope.changePassword = function(passwordData) {
                changePasswordService.changePassword(passwordData)
                    .then(function(success) {
                        $window.history.back();
                    })
            }
        }]);