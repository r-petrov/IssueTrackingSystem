'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'issueTrackingSystem.common.mainController',
        'issueTrackingSystem.common.previousPageDirective',
        'issueTrackingSystem.home',
        'issueTrackingSystem.users.identityService',
        'issueTrackingSystem.dashboard',
        'issueTrackingSystem.logout'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
