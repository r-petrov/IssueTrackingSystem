/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.addProject.addProjectService', [])
    .factory('addProjectService', [
        '$http',
        '$q',
        'BASE_URL',
        'createProjectRequestBodyService',
        function addProjectService($http, $q, BASE_URL, createProjectRequestBodyService) {

            function addProject(project) {
                var deferred = $q.defer(),
                    addProjectUrl = BASE_URL + 'projects',
                    requestBody = createProjectRequestBodyService.createProjectRequestBody(project);

                $http.post(addProjectUrl, requestBody)
                    .then(function(addedProject) {
                        deferred.resolve(addedProject);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                addProject: addProject
            }
        }]);
