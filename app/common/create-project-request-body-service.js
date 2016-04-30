/**
 * Created by PC on 29.04.2016 г..
 */
angular.module('issueTrackingSystem.common.createProjectRequestBodyService', [])
    .factory('createProjectRequestBodyService', [function createProjectRequestBodyService() {
        function processInputLists(inputList) {
            var output = '';
            if (inputList !== undefined) {
                output = inputList.split(/,\s*/);
            }

            return output;
        }

        function createObjectsCollection(collection) {
            var i,
                objectsCollection = [],
                length = collection.length;
            for (i = 0; i < length; i++) {
                var currentItem = collection[i],
                    currentObject = {};

                if (currentItem && currentItem !== '') {
                    currentObject = {
                        'Name': currentItem
                    };

                    objectsCollection.push(currentObject);
                }

            }

            return objectsCollection;
        }

        function createProjectRequestBody(project) {
            var priorities = project.Priorities,
                labels = project.Labels,
                requestBody = {
                'Name': project.Name,
                'Description': project.Description,
                'ProjectKey': project.ProjectKey,
            };

            if (priorities) {
                priorities = processInputLists(priorities.toString());
                requestBody.Priorities = createObjectsCollection(priorities);
            }

            if (labels) {
                labels = processInputLists(labels.toString());
                requestBody.Labels = createObjectsCollection(labels);
            }

            requestBody.LeadId = project.LeadId;
            console.log(requestBody);

            return requestBody;
        }

        return {
            createProjectRequestBody: createProjectRequestBody
        }
    }]);