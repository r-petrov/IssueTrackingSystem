/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.projects.projectsController',
    ['ngRoute', 'issueTrackingSystem.users.identityService', 'issueTrackingSystem.common.getProjectsService'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects', {
            templateUrl: 'app/projects/projects.html',
            controller: 'ProjectsController',
            resolve: routeChecks.isAuthenticated
        });

    }])
    .controller('ProjectsController', [
        '$scope',
        '$uibModal',
        '$location',
        'getProjectsService',
        'PAGE_SIZE',
        'MAX_SIZE',
        function ProjectsController($scope, $uibModal, $location, getProjectsService, PAGE_SIZE, MAX_SIZE) {
            $scope.pageSize = {
                itemsPerPage: PAGE_SIZE
            };
            $scope.maxSize = {
                paginationSize: MAX_SIZE
            };
            $scope.currentPage = {
                projectsPage: 1
            };
            $scope.totalItems = {
                projectsCount: 0
            };
            /*getProjectsService.getAllProjects()
                .then(function(allProjects) {
                    /!*$scope.numberOfPages = Math.ceil(allProjects.data.length / $scope.pageSize);*!/


                    //$scope.$watch('currentPage', $scope.setPage);


                },
                function(error) {
                    console.log(error);
                });*/

            $scope.setProjectsPage = {
                setProjects: function() {
                    getProjectsService.getProjects($scope.pageSize.itemsPerPage, $scope.currentPage.projectsPage)
                        .then(function(projects) {
                            $scope.projects = {
                                projects: projects.data.Projects
                            };
                            $scope.totalItems.projectsCount = projects.data.TotalCount;
                        });
                }
            };

            $scope.setProjectsPage.setProjects();

            $scope.openAddProjectModal = function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'app/add-project/add-project.html',
                    controller: 'AddProjectController',
                    size: 'lg',
                });
            }
        }]);