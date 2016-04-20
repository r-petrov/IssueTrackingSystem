/**
 * Created by PC on 18.04.2016 г..
 */
angular.module('issueTrackingSystem.logout', [
        'ngRoute',
        'issueTrackingSystem.users.authenticationService'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/logout', {
            templateUrl: 'app/logout/logout.html',
            controller: 'LogoutController',
            resolve: {
                loggedInUser: function(identityService) {
                    return identityService.getCurrentUser();
                }
            }
        });
    }])
    .controller('LogoutController', ['$scope', '$cookies', '$window', 'authenticationService',
        function LogoutController($scope, $cookies, $window, authenticationService) {
            $scope.logout = function(currentUser) {
                authenticationService.logout(currentUser)
                    .then(function(success) {
                        $cookies.remove('accessToken');
                        $window.location.href = '#/';
                        $window.location.reload();
                    });
            }
    }]);