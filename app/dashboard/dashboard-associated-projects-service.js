/**
 * Created by PC on 05.05.2016 г..
 */
angular.module('issueTrackingSystem.dashboard.dashboardAssociatedProjectsService', [])
    .factory('dashboardAssociatedProjectsService', [
        '$http',
        '$q',
        'BASE_URL',
        'identityService',
        function dashboardAssociatedProjectsService($http, $q, BASE_URL, identityService) {
            function getAssociatedProjects(pageSize, pageNumber) {
                var associatedProjectsUrl,
                    currentUserId,
                    deferred = $q.defer(),
                    currentPageSize = pageSize || 140,
                    currentPageNumber = pageNumber || 1;
                     //BASE_URL + 'Issues/?pageSize=' + currentPageSize + '&pageNumber=1&filter={value}Project.LeadId=';

                identityService.getCurrentUser()
                    .then(function(currentUser) {
                        currentUserId = currentUser.data.Id;
                        associatedProjectsUrl = BASE_URL + 'projects?filter=Lead.Id=\"' + currentUserId + '\"&pageSize=' + currentPageSize + '&pageNumber=' + currentPageNumber;
                        $http.get(associatedProjectsUrl)
                            .then(function(associatedProjects) {
                                deferred.resolve(associatedProjects);
                            },
                            function(error) {
                                deferred.reject(error);
                            })
                    },
                    function(error) {
                        console.log(error);
                    });

                return deferred.promise;
            }

            return {
                getAssociatedProjects: getAssociatedProjects
            }
        }]);