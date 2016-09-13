'use strict';

/**
 * @ngdoc function
 * @name dashboardJsApp.controller:feedbackCtrl
 * @description
 * # feedbackCtrl
 * Controller of the dashboardJsApp
 */
angular.module('dashboardJsApp')
        .controller('feedbackCtrl', function ($scope, AuthService, $http, $timeout) {
            $scope.fb = [];
            $scope.currentUser = null;
            $scope.auth = AuthService;
            //airtable endpoint
            var airtable_write_endpoint = "https://api.airtable.com/v0/appKDZNCDhocdG5oI/Table%201?api_key=keyiQS2vZoLV9vvB0";
            $scope.isDisabled = false;

            $scope.submitForm = function () {
                $http({
                    method: 'POST',
                    url: airtable_write_endpoint,
                    data: {"fields": {
                            "user_id": $scope.auth.getUserId(),
                            "problem": $scope.fb.problem,
                            "url": window.location.toString(),
                            "comment": $scope.fb.feedback
                        }},
                    headers: {'Content-Type': 'application/json'}  // set the headers so angular passing info as form data (not request payload)
                }).success(function (data, status) {
                    console.log(data, status);
                    if (status === 200) {
                        $scope.message = "Thank You! Closing this window..";
                        $scope.alertclass = "alert-success";
                        $scope.isDisabled = true;
                        $timeout( function(){ $scope.$modalCancel(); }, 3000);
                    } else {
                        $scope.message = "An error has occurred: " + data.status + "<br/>If the problem persists notify AdelaideX.";
                        $scope.alertclass = "alert-warning";
                    }
                }).error(function (data, status) {
                    $scope.message = "An error has occurred: " + data.error.message + "<br/>If the problem persists notify AdelaideX.";
                    $scope.alertclass = "alert-warning";
                    console.log(data);
                    console.log(status);
                });
            };
        });