/**
 * Created by PC on 02.05.2016 г..
 */
angular.module('issueTrackingSystem.addIssue.addIssueController', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated()) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized Access');
            }]
        };

        $routeProvider.when('/projects/:Id/add-issue', {
            templateUrl: 'app/add-issue/add-issue.html',
            controller: 'AddIssueController',
            resolve: routeChecks.isAuthenticated
        })
    }])
    .controller('AddIssueController', [
        '$scope',
        '$routeParams',
        'getProjectByIdService',
        'getProjectsService',
        'addIssueService',
        function AddIssueController($scope, $routeParams, getProjectByIdService, getProjectsService, addIssueService) {
            var projectId = $routeParams.Id;
            getProjectByIdService.getProjectById(projectId)
                .then(function(project) {
                    $scope.projectName = project.data.Name;
                    $scope.priorities = project.data.Priorities;
                },
                function(error) {
                    console.log(error);
                });

            $scope.addIssue = function(issue) {
                if (issue.Title && issue.Description && issue.DueDate && issue.AssigneeId && issue.PriorityId) {
                    issue.ProjectId = projectId;
                    console.log(issue);
                    addIssueService.addIssue(issue)
                        .then(function (issue) {
                                console.log(issue);
                                $scope.back();
                            },
                            function(error) {
                                console.log(error);
                            })
                }
                else {
                    toastr.error('Issue Title, Description, DueDate, AssigneeId and PriorityId are mandatory fields!')
                }
            };

            //$scope.labels = ["john", "bill", "charlie", "robert", "alban", "oscar", "marie", "celine", "brad", "drew", "rebecca", "michel", "francis", "jean", "paul", "pierre", "nicolas", "alfred", "gerard", "louis", "albert", "edouard", "benoit", "guillaume", "nicolas", "joseph"];

            /*getProjectsService.getProjects()
                .then(function(projects) {
                    var defaultProject = projects.data.filter(function(project) {
                        return project.Id === projectId;
                    });
                    console.log(defaultProject);
                    //console.log(projects);
                    $scope.projects = projects.data;
                    console.log(projects.data);
                });*/
        }]);