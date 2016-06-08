/**
 * Created by PC on 18.04.2016 г..
 */
angular.module('issueTrackingSystem.logout', [
        'ngRoute',
        'issueTrackingSystem.users.authenticationService'
    ])
    /*.config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/logout', {
            templateUrl: 'app/logout/logout.html',
            controller: 'LogoutController',
            resolve: routeChecks.isAuthenticated
        });
    }])*/
    .controller('LogoutController', [
        '$scope',
        '$rootScope',
        '$location',
        '$window',
        '$uibModalInstance',
        'authenticationService',
        'toastr',
        function LogoutController($scope, $rootScope, $location,  $window, $uibModalInstance, authenticationService, toastr) {
            $scope.logout = function(currentUser) {
                authenticationService.logout(currentUser)
                    .then(function(success) {
                        toastr.success('You successfully logged out!');
                        $location.path('/');
                        //$window.location.href = '#/';
                        $window.location.reload();
                        //$rootScope.isAuthenticated = false;
                    });
            };

            $scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
    }]);