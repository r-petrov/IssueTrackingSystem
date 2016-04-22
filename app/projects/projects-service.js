/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.projects.projectsService', [])
    .factory('projectsService', [
        '$http',
        '$q',
        'BASE_URL',
        function projectsService($http, $q, BASE_URL) {

            function getProjects() {
                var deferred = $q.defer(),
                    projectsUrl = BASE_URL + 'projects';

                $http.get(projectsUrl)
                    .then(function(projects) {
                        deferred.resolve(projects);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getProjects: getProjects
            }
    }]);