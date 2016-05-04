/**
 * Created by PC on 03.05.2016 г..
 */
angular.module('issueTrackingSystem.common.autoCompleteDirective', [])
    .directive('autoCompleteDirective', [
        '$timeout',
        function autoCompleteDirective($timeout) {
            return {
                restrict: 'A',
                link: function(scope, iElement, iAttrs) {
                    console.log(scope);
                    console.log(iElement);
                    console.log(iAttrs);
                    iElement.autocomplete({
                        source: scope[iAttrs.uiItems],
                        select: function() {
                            $timeout(function() {
                                iElement.trigger('input');
                            }, 0);
                        }
                    });
                }
            }
        }]);