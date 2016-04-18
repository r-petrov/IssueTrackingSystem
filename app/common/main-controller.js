/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.common.mainController', [])
    .controller('MainController', ['$scope', 'identityService', function MainController($scope, identityService) {
        identityService.getCurrentUser()
            .then(function(currentUser) {
                $scope.currentUser = currentUser;
                console.log($scope.currentUser);
                $scope.isAuthenticated = identityService.isAuthenticated();
                console.log($scope.isAuthenticated);
            },
            function(error) {
                console.log(error);
            });
    }]);