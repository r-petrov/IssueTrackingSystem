/**
 * Created by PC on 18.04.2016 г..
 */
angular.module('issueTrackingSystem.common.previousPageController', [])
    .controller('PreviousPageController', ['$scope', '$window', function PreviousPageController($scope, $window) {
        $scope.back = function() {
            $window.history.back();
        }
    }]);