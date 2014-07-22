'use strict';

/**
 * @ngdoc function
 * @name dashboardJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dashboardJsApp
 */
angular.module('dashboardJsApp')
    .controller('Visualisation_enrolmentmetadata_Ctrl', ['$scope', 'RequestService', 'Course', 'AuthService', function ($scope, RequestService, Course, AuthService) {
        $scope.auth = AuthService;

        $scope.$watch('auth.isAuthenticated()', function() {
            if ($scope.auth.isAuthenticated()) {
                RequestService.async('http://api.uqxdev.com/api/students/ages/' + Course.currentCourse + '/').then(function(data) {
                    $scope.ageData = $scope.formatPieData(data);
                });

                RequestService.async('http://api.uqxdev.com/api/students/genders/' + Course.currentCourse + '/').then(function(data) {
                    $scope.genderData = $scope.formatPieData(data);
                });

                RequestService.async('http://api.uqxdev.com/api/students/educations/' + Course.currentCourse + '/').then(function(data) {
                    $scope.educationData = $scope.formatPieData(data);
                });

                RequestService.async('http://api.uqxdev.com/api/students/modes/' + Course.currentCourse + '/').then(function(data) {
                    $scope.enrolTypeData = $scope.formatPieData(data);
                });
            }
        }, true);

        $scope.formatPieData = function(unformattedData) {
            var formattedData = [];

            for (var key in unformattedData) {
                formattedData.push({ label: key, value: unformattedData[key] });
            }

            return formattedData;
        };
  }]);