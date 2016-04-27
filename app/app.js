'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'issueTrackingSystem.common.mainController',
        'issueTrackingSystem.common.previousPageController',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.identityService',
        'issueTrackingSystem.dashboard.dashboardController',
        'issueTrackingSystem.dashboard.dashboardIssuesService',
        'issueTrackingSystem.dashboard.dashboardService',
        'issueTrackingSystem.logout',
        'issueTrackingSystem.changePassword.changePasswordController',
        'issueTrackingSystem.changePassword.changePasswordService',
        'issueTrackingSystem.projects.projectsService',
        'issueTrackingSystem.projects.projectsController',
        'issueTrackingSystem.addProject.addProjectController',
        'issueTrackingSystem.addProject.addProjectService',
        'issueTrackingSystem.common.getUsersController',
        'issueTrackingSystem.common.getUsersService',
    ])
    .config(['$routeProvider', function ($routeProvider) {
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
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
