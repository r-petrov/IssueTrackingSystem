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
        'issueTrackingSystem.addProject.getUsersController',
        'issueTrackingSystem.addProject.getUsersService',
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .run(['authenticationService', function(authenticationService) {
        authenticationService.refreshCookie();
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    /*.value('user', function(identityService) {
        return identityService.getCurrentUser();
    })*/;
