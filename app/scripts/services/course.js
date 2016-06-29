'use strict';

/**
 * @ngdoc service
 * @name dashboardJsApp.Course
 * @description
 * # Course
 * Service in the dashboardJsApp.
 */
angular.module('dashboardJsApp')
        .service('Course', function Course() {
            this.currentCourse = '';
            this.courseList = [];

            this.setCourseList = function (courseList) {
                if (!courseList['error']) {
                    courseList.splice(0, 0, {'icon': 'fa-dashboard', 'id': 'allcourses', 'name': 'All Courses List'});
                    for (var i in courseList) {
                        var shortName = courseList[i].name.split(" ");
                        var subName = courseList[i].name.split(" ");
                        subName.shift();
                        subName = subName.join(" ");
                        if (shortName[0] === "All") {
                            shortName = shortName[0] + " " + shortName[1];
                            subName = "";
                        }
                        else {
                            shortName = shortName[0];
                        }
                        
                        shortName = shortName.charAt(0).toUpperCase() + shortName.slice(1);
                        courseList[i].shortName = shortName;
                        courseList[i].subName = subName;
                    }
                } else {
                    alert(courseList['error']);
                    return null;
                }
                
                this.courseList = courseList;
            };

            this.getCurrentCourseShortName = function () {
                for (var key in this.courseList) {
                    if (this.courseList[key].id === this.currentCourse) {
                        return this.courseList[key].shortName;
                    }
                }

                return '';
            };

            this.getCourseIds = function () {
                console.log("GETTING ID");
                var courseIds = [];

                for (var key in this.courseList) {
                    courseIds.push(this.courseList[key].id);
                }

                return courseIds;
            };

            this.getCourseNameFromId = function (courseId) {
                console.log("GETTING NAME");
                for (var key in this.courseList) {
                    if (this.courseList[key].id === courseId) {
                        return this.courseList[key].name;
                    }
                }

                return null;
            };

            this.getCourseIconFromId = function (courseId) {
                console.log("GETTING ICON");
                for (var key in this.courseIcon) {
                    if (this.courseList[key].id === courseId) {
                        return this.courseList[key].name;
                    }
                }

                return null;
            };

            return this;
        });
