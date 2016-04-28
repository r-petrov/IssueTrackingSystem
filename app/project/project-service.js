/**
 * Created by PC on 27.04.2016 г..
 */
angular.module('issueTrackingSystem.project.projectService', [])
    .factory('projectService', [
        '$http',
        '$q',
        'BASE_URL',
        function projectService($http, $q, BASE_URL) {
            function getProjectById(projectId) {
                var deferred = $q.defer(),
                    projectUrl = BASE_URL + 'Projects/' + projectId;

                $http.get(projectUrl)
                    .then(function(project) {
                        console.log(project);
                        deferred.resolve(project);
                    },
                    function(error) {
                        console.log(error);
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                getProjectById: getProjectById
            }
        }]);