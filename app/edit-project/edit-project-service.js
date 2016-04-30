/**
 * Created by PC on 29.04.2016 г..
 */
angular.module('issueTrackingSystem.editProject.editProjectService', [])
    .factory('editProjectService', [
        '$http',
        '$q',
        'BASE_URL',
        'createProjectRequestBodyService',
        function editProjectService($http, $q, BASE_URL, createProjectRequestBodyService) {
            function editProject(projectId, project) {
                var deferred = $q.defer(),
                    editProjectUrl = BASE_URL + 'Projects/' + projectId,
                    requestBody;

                requestBody = createProjectRequestBodyService.createProjectRequestBody(project);
                delete requestBody.ProjectKey;

                $http.put(editProjectUrl, requestBody)
                    .then(function(editedProject) {
                        deferred.resolve(editedProject);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                editProject: editProject
            }
        }]);