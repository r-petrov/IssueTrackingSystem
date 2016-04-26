/**
 * Created by PC on 16.04.2016 г..
 */
angular.module('issueTrackingSystem.common.mainController', [])
    .controller('MainController', [
        '$rootScope',
        'identityService',
        function MainController($rootScope, identityService) {
            identityService.getCurrentUser()
                .then(function(currentUser) {
                    debugger;
                    $rootScope.currentUser = currentUser;
                    console.log($rootScope.currentUser);
                    $rootScope.isAdmin = currentUser.data.isAdmin;
                    console.log($rootScope.isAdmin);
                    $rootScope.isAuthenticated = true;
                },
                function(error) {
                    console.log(error);
                });
        }]);