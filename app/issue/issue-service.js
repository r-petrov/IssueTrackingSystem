/**
 * Created by PC on 05.05.2016 г..
 */
angular.module('issueTrackingSystem.issue.issueService', [])
    .factory('issueService', [
        '$http',
        '$q',
        'BASE_URL',
        function issueService($http, $q, BASE_URL) {
            /*function getCurrentIssue(issueId) {
                var deferred = $q.defer(),
                    getCurrentIssueUrl = BASE_URL + 'Issues/' + issueId;

                $http.get(getCurrentIssueUrl)
                    .then(function(currentIssue) {
                        deferred.resolve(currentIssue);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }*/

            function getComments(issueId) {
                var deferred = $q.defer(),
                    getCommentsUrl = BASE_URL + 'Issues/' + issueId + '/comments';

                $http.get(getCommentsUrl)
                    .then(function(comments) {
                        console.log(comments);
                        deferred.resolve(comments);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function addComment(issueId, newComment) {
                var deferred = $q.defer(),
                    addCommentUrl = BASE_URL + 'Issues/' + issueId + '/comments',
                    requestBody = {
                        Text: newComment
                    };

                $http.post(addCommentUrl, requestBody)
                    .then(function(allComments) {
                        console.log(allComments);
                        deferred.resolve(allComments);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function changeStatus(issueId, newStatusId) {
                var deferred = $q.defer(),
                    changeStatusUrl = BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + newStatusId;

                $http.put(changeStatusUrl)
                    .then(function(newAvailableStatuses) {
                        deferred.resolve(newAvailableStatuses);
                    },
                    function(error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            return {
                //getCurrentIssue: getCurrentIssue,
                getComments: getComments,
                addComment: addComment,
                changeStatus: changeStatus
            }
        }]);