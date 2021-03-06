'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap',
        'bw.paging',
        'angularUtils.directives.dirPagination',
        'issueTrackingSystem.common.mainController',
        'issueTrackingSystem.common.previousPageController',
        'issueTrackingSystem.common.autoCompleteDirective',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.identityService',
        'issueTrackingSystem.users.authenticationService',
        'issueTrackingSystem.dashboard.dashboardController',
        'issueTrackingSystem.dashboard.dashboardIssuesService',
        'issueTrackingSystem.dashboard.dashboardService',
        'issueTrackingSystem.dashboard.dashboardAssociatedProjectsService',
        'issueTrackingSystem.logout',
        'issueTrackingSystem.changePassword.changePasswordController',
        'issueTrackingSystem.changePassword.changePasswordService',
        'issueTrackingSystem.common.getProjectsService',
        'issueTrackingSystem.projects.projectsController',
        'issueTrackingSystem.addProject.addProjectController',
        'issueTrackingSystem.addProject.addProjectService',
        'issueTrackingSystem.common.getUsersController',
        'issueTrackingSystem.common.getUsersService',
        'issueTrackingSystem.project.projectController',
        'issueTrackingSystem.common.getProjectByIdService',
        'issueTrackingSystem.common.createProjectRequestBodyService',
        'issueTrackingSystem.common.createIssueRequestBodyService',
        'issueTrackingSystem.project.projectIssuesService',
        'issueTrackingSystem.editProject.editProjectController',
        'issueTrackingSystem.editProject.editProjectService',
        'issueTrackingSystem.editProject.transformCollectionsService',
        'issueTrackingSystem.addIssue.addIssueController',
        'issueTrackingSystem.addIssue.addIssueService',
        'issueTrackingSystem.issue.issueController',
        'issueTrackingSystem.issue.issueService',
        'issueTrackingSystem.common.getIssueByIdService',
        'issueTrackingSystem.editIssue.editIssueController',
        'issueTrackingSystem.editIssue.editIssueService',
        'issueTrackingSystem.common.pagination',
    ])
    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $httpProvider.interceptors.push(['$q', 'toastr', function($q, toastr) {
            return {
                'responseError': function(rejection) {
                    if (rejection.data && rejection.data['error_description']) {
                        toastr.error(rejection.data['error_description']);
                    }
                    else if(rejection.data && rejection.data.ModelState && rejection.data.ModelState['']) {
                        var errors = rejection.data.ModelState[''];
                        if (errors.length > 0) {
                            toastr.error(errors[0]);
                        }
                    }

                    return $q.reject(rejection);
                }
            }
        }]);

        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['$rootScope', '$location', 'authenticationService', function($rootScope, $location, authenticationService) {
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            console.log('unauthorized access');
            $location.path('/');
        });

        authenticationService.refreshCookie();
    }])
    /*.provider('routeResolversProvider', [function routeResolversProvider() {
        var routeChecks = {
            isAuthenticated: ['$q', 'authenticationService', function($q, authenticationService) {
                if (authenticationService.isAuthenticated) {
                    return $q.when(true);
                }

                return $q.reject('Unauthorized user access');
            }],
            /!*isAdmin: ['$q', '$rootScope', 'authenticationService', function($q, $rootScope, authenticationService) {
             if ($rootScope.isAdmin) {
             return $q.when(true);
             }

             return $q.reject('Unauthorized user access');
             }]*!/
        };

        return {
            $get: function() {
                return routeChecks;
            }
        }
    }])*/
    .constant('toastr', toastr)
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('MAX_SIZE', 5)
    .constant('PAGE_SIZE', 10);
