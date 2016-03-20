(function() {
	'use strict';

	angular
		.module('app.feed', [])
		.controller('feedCtrl',['$scope', '$state', 'AccountService', feedCtrl]);

	function feedCtrl($scope, $state , accountService) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "Campture";

		//====== Scope Variables==========
        //================================
        vm.isSiteLoaded = false;
        vm.myTrips;
        vm.allTrips;
        vm.newsFeedTrips;
        vm.newTrip;
        vm.userObj = Parse.User.current();
        vm.isPostSuccessful = false;
        vm.query = {};
        vm.queryBy = '$';

        accountService.getAllTrips(function (data) {
            vm.$apply(function () {
                vm.allTrips = data;
                angular.forEach(vm.allTrips, function (trip) {
                    try {
                        var initUrl = trip.main_image ? trip.main_image.image_url : trip.visited_places[0].images[0].image_url;
                        trip.cropped_image_url = vm.getCroppedTripImageUrl(initUrl);
                    } catch (e) {
                        console.log(e);
                    }

                });
                vm.isSiteLoaded = true;
            });
        });

        vm.postTrip = function () {
            accountService.postTrip(vm.newTrip, function (data) {
                vm.$apply(function () {
                    if (data) {
                        vm.newTrip = undefined;
                        vm.isPostSuccessful = true;
                    }
                });
            });
        };

        vm.getCroppedTripImageUrl = function (url, transString) {
            try {
                if (!transString) {
                    transString = 'upload/c_fill,h_440,w_440/';
                }
                var arr = url.split('upload/');
                var croppedUrl = arr[0] + transString + arr[1];
            } catch (e) {
                console.log(e);
            }
            return croppedUrl;
        };

	}

})();