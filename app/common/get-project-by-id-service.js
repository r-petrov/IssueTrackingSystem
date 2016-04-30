/**
 * Created by PC on 27.04.2016 г..
 */
angular.module('issueTrackingSystem.common.getProjectByIdService', [])
    .factory('getProjectByIdService', [
        '$http',
        '$q',
        'BASE_URL',
        function getProjectByIdService($http, $q, BASE_URL) {

            function getProjectById(projectId) {
                var deferred = $q.defer(),
                    projectUrl = BASE_URL + 'Projects/' + projectId;

                $http.get(projectUrl)
                    .then(function(project) {
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