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
            /*function processInputLists(inputList) {
                return inputList.split(/,\s*!/);
            }

            function createObjectsCollection(collection) {
                var i,
                    objectsCollection = [],
                    length = collection.length;
                for (i = 0; i < length; i++) {
                    var currentItem = collection[i],
                        currentObject = {
                            'Name': currentItem
                        };

                    objectsCollection.push(currentObject);
                }

                return objectsCollection;
            }

            function createAddProjectRequestBody(project, labels, priorities) {
                var requestBody = {
                        'Name': project.Name,
                        'Description': project.Description,
                        'ProjectKey': project.ProjectKey,
                };

                requestBody.Labels = createObjectsCollection(labels);
                requestBody.Priorities = createObjectsCollection(priorities);
                requestBody.LeadId = project.LeadId;

                return requestBody;
            }*/

            function addProject(project) {
                var deferred = $q.defer(),
                    addProjectUrl = BASE_URL + 'projects',
                    requestBody = createProjectRequestBodyService(project);

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
