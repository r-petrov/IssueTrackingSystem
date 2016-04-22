/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.common.mainController', [])
    .controller('MainController', ['$scope', 'identityService', function MainController($scope, identityService) {
        $scope.isAuthenticated = identityService.isAuthenticated();

        identityService.getCurrentUser()
            .then(function(currentUser) {
                $scope.currentUser = currentUser;
                console.log($scope.currentUser);
                $scope.isAdmin = currentUser.data.isAdmin;
                console.log($scope.isAdmin);
            },
            function(error) {
                console.log(error);
            });
    }]);