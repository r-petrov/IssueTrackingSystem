/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.common.getProjectsService', [])
    .factory('getProjectsService', [
        '$http',
        '$q',
        'BASE_URL',
        function getProjectsService($http, $q, BASE_URL) {

            function getProjects(pageSize, pageNumber) {
                var deferred = $q.defer(),
                    currentPageSize = pageSize || 140,
                    currentPageNumber = pageNumber || 1,
                    projectsUrl = BASE_URL + 'projects/?pageSize=' + currentPageSize + '&pageNumber=' + currentPageNumber + '&filter=';
                console.log(projectsUrl);

                $http.get(projectsUrl)
                    .then(function(projects) {
                        console.log(projects);
                        deferred.resolve(projects);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function getAllProjects() {
                var deferred = $q.defer(),
                    projectsUrl = BASE_URL + 'projects';

                $http.get(projectsUrl)
                    .then(function(projects) {
                            console.log(projects);
                            deferred.resolve(projects);
                        },
                        function(error) {
                            deferred.reject(error);
                        });

                return deferred.promise;
            }

            return {
                getProjects: getProjects,
                getAllProjects: getAllProjects
            }
    }]);