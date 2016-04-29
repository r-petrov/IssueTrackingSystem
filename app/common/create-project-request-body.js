/**
 * Created by PC on 29.04.2016 г..
 */
angular.module('issueTrackingSystem.common.createProjectRequestBodyService', [])
    .factory('createProjectRequestBodyService', [function createProjectRequestBody() {
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

        function createProjectRequestBody(project) {
            var priorities = processInputLists(project.Priorities.toString()),
                labels = processInputLists(project.Labels.toString()),
                requestBody = {
                'Name': project.Name,
                'Description': project.Description,
                'ProjectKey': project.ProjectKey,
            };

            requestBody.Labels = createObjectsCollection(labels);
            requestBody.Priorities = createObjectsCollection(priorities);
            requestBody.LeadId = project.LeadId;

            return requestBody;
        }

        return {
            createProjectRequestBody: createProjectRequestBody
        }
    }]);