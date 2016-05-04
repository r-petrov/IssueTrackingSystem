/**
 * Created by PC on 03.05.2016 г..
 */
angular.module('issueTrackingSystem.common.createIssueRequestBodyService', [])
    .factory('createIssueRequestBodyService', function createIssueRequestBodyService() {
        function createIssueRequestBody(issue) {
            var requestBody = {
                Title: issue.Title,
                Description: issue.Description,
                DueDate: issue.DueDate,
                ProjectId: issue.ProjectId,
                AssigneeId: issue.AssigneeId,
                PriorityId: issue.PriorityId
            };

            console.log(requestBody);

            return requestBody;
        }

        return {
            createIssueRequestBody: createIssueRequestBody
        }
    });