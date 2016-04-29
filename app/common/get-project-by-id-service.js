/**
 * Created by PC on 27.04.2016 г..
 */
angular.module('issueTrackingSystem.common.getProjectByIdService', [])
    .factory('getProjectByIdService', [
        '$http',
        '$q',
        'BASE_URL',
        function getProjectByIdService($http, $q, BASE_URL) {
            function createStringFromCollection(collection) {
                var i,
                    output = '',
                    collectionLength = collection.length;

                for (i = 0; i < collectionLength; i++) {
                    output += (collection[i].Name + ', ');
                }

                return output;
            }

            function getProjectById(projectId) {
                var deferred = $q.defer(),
                    projectUrl = BASE_URL + 'Projects/' + projectId;

                $http.get(projectUrl)
                    .then(function(project) {
                        var labelsString = '',
                            prioritiesString = '',
                            labels = project.data.Labels,
                            priorities = project.data.Priorities;

                        if(labels) {
                            labelsString = createStringFromCollection(labels);
                            project.data.LabelsString = labelsString;
                        }

                        prioritiesString = createStringFromCollection(priorities);
                        project.data.PrioritiesString = prioritiesString;

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