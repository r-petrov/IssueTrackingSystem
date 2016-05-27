/**
 * Created by PC on 18.05.2016 г..
 */
angular.module('issueTrackingSystem.common.pagination', [])
    .directive('pagination', [function pagination() {
        return {
            restrict: 'A',
            scope: {
                numPages: '=',
                currentPage: '=',
                max: '=',
                onSelectPage: '&'
            },
            templateUrl: 'app/common/template/pagination.html',
            replace: true,
            link: function(scope) {
                console.log(scope);
                scope.$watch('numPages', function(value) {
                    scope.pages = [];
                    for (var i = 1; i <= value; i++) {
                        scope.pages.push(i);
                    }

                    if (scope.currentPage > value) {
                        scope.selectPage(value);
                    }
                });

                scope.noPrevious = function() {
                    return scope.currentPage === 1;
                };

                scope.noNext = function() {
                    return scope.currentPage === scope.numPages;
                };

                scope.isActive = function(page) {
                    return scope.currentPage === page;
                };

                scope.selectPage = function(page) {
                    if (!scope.isActive(page)) {
                        scope.currentPage = page;
                        scope.onSelectPage({
                            page: page
                        });
                    }
                };

                scope.selectFirst = function() {
                    scope.selectPage(1);
                };

                scope.selectPrevious = function() {
                    if (!scope.noPrevious()) {
                        scope.selectPage(scope.currentPage - 1);
                    }
                };

                scope.selectNext = function() {
                    if (!scope.noNext()) {
                        scope.selectPage(scope.currentPage + 1);
                    }
                };

                scope.selectLast = function() {
                    scope.selectPage(scope.numPages);
                };
            }
        };
    }]);