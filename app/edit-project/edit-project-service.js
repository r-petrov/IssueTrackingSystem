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
                    requestBody = createProjectRequestBodyService.createProjectRequestBody(project);
                    delete requestBody.ProjectKey;
                console.log(requestBody);

                $http.put(editProjectUrl, requestBody)
                    .then(function(success) {
                        deferred.resolve();
                        console.log(success);
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