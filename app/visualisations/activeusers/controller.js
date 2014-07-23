'use strict';

/**
 * @ngdoc function
 * @name dashboardJsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dashboardJsApp
 */
angular.module('dashboardJsApp')
	.controller('Visualisation_activeusers_Ctrl', ['$scope', 'RequestService', 'Course', 'AuthService', function ($scope, RequestService, Course, AuthService) {
		$scope.auth = AuthService;

		$scope.$watch('auth.isAuthenticated()', function() {
			if ($scope.auth.isAuthenticated()) {
				RequestService.async('http://api.uqxdev.com/api/students/active/' + Course.currentCourse + '/').then(function(data) {
					var formattedDailyData = [{ name: 'Daily', data: [] }];
					var formattedWeeklyData = [{ name: 'Weekly', data: [] }];

					for (var day in data['days']) {
						formattedDailyData[0].data.push({ date: day, value: data['days'][day] });
					}

					for (var week in data['weeks']) {
						formattedWeeklyData[0].data.push({ date: week, value: data['weeks'][week] });
					}

					$scope.dailyData = formattedDailyData;
					$scope.weeklyData = formattedWeeklyData;
				});
			}
		}, true);
	}]);