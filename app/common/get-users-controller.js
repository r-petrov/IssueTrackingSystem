/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.common.getUsersController', ['issueTrackingSystem.common.getUsersService'])

    .controller('GetUsersController', [
        '$scope',
        'getUsersService',
        function GetUsersController($scope, getUsersService) {
            getUsersService.getUsers()
                .then(function(users) {
                    $scope.users = users.data;
                },
                function(error) {
                    console.log(error);
                });
        }]);