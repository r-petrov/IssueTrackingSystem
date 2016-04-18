/**
 * Created by PC on 18.04.2016 г..
 */
angular.module('issueTrackingSystem.common.previousPageDirective', [])
    .directive('previousPageDirective', ['$window', function previousPageDirective($window) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function() {
                    $window.history.back();
                })
            }
        }
    }]);