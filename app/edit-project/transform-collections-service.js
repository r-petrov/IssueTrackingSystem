/**
 * Created by PC on 30.04.2016 г..
 */
angular.module('issueTrackingSystem.editProject.transformCollectionsService', [])
    .factory('transformCollectionsService', [function transformCollectionsService() {
        function createStringFromCollection(collection) {
            var i,
                output = '',
                collectionLength = collection.length;

            for (i = 0; i < collectionLength; i++) {
                output += (collection[i].Name + ', ');
            }

            return output;
        }

        function transformCollections(project) {
            var labelsString = '',
                prioritiesString = '',
                labels = project.data.Labels,
                priorities = project.data.Priorities;

            if(labels) {
                labelsString = createStringFromCollection(labels);
                project.data.Labels = labelsString;
            }

            if (priorities) {
                prioritiesString = createStringFromCollection(priorities);
                project.data.Priorities = prioritiesString;
            }

            return project;
        }

        return {
            transformCollections: transformCollections
        }
    }]);