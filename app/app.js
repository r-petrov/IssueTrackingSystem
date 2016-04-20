'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'issueTrackingSystem.common.mainController',
        'issueTrackingSystem.common.previousPageController',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.identityService',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.logout',
        'issueTrackingSystem.changePassword.changePasswordController',
        'issueTrackingSystem.changePassword.changePasswordService',
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    /*.value('user', function(identityService) {
        return identityService.getCurrentUser();
    })*/;
