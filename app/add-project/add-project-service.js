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
                var //transitionSchemeId = '',
                    requestBody = {
                        'Name': project.Name,
                        'Description': project.Description,
                        'ProjectKey': project.ProjectKey,
                        /*'Labels': labels,
                        'Priorities': priorities,
                        'LeadId': project.LeadId*/
                };

                requestBody.Labels = createObjectsCollection(labels);
                requestBody.Priorities = createObjectsCollection(priorities);
                requestBody.LeadId = project.LeadId;

                //requestBody.LeadId = project.LeadId;
                //requestBody[transitionSchemeId] = '';
                //console.log(requestBody);
                //console.log(Object.keys(requestBody));

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
