/**
 * Created by PC on 22.04.2016 г..
 */
angular.module('issueTrackingSystem.addProject.addProjectService', [])
    .factory('addProjectService', [
        '$http',
        '$q',
        'BASE_URL',
        function addProjectService($http, $q, BASE_URL) {
            function processInputLists(inputList) {
                return inputList.split(/,\s*/);
            }

            function addCollectionToRequestBody(obj, collection) {
                for(var key in collection) {
                    var item = collection[key];
                    obj[item] = item;
                }
            }

            function createAddProjectRequestBody(project, labels, priorities) {
                var transitionSchemeId = '',
                    requestBody = {
                    Name: project.Name,
                    Description: project.Description,
                    ProjectKey: project.ProjectKey,
                };

                addCollectionToRequestBody(requestBody, labels);
                addCollectionToRequestBody(requestBody, priorities);

                requestBody.LeadId = project.LeadId;
                requestBody[transitionSchemeId] = '';
                console.log(requestBody);
                console.log(Object.keys(requestBody));

                return requestBody;
            }

            function addProject(project) {
                var deferred = $q.defer(),
                    addProjectUrl = BASE_URL + 'projects',
                    priorities = processInputLists(project.Priorities.toString()),
                    labels = processInputLists(project.Labels.toString()),
                    requestBody = createAddProjectRequestBody(project, labels, priorities);

                $http.post(addProjectUrl, requestBody)
                    .then(function(addedProject) {
                        console.log('added project: ' + addedProject);
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
