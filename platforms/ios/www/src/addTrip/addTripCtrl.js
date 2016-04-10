(function() {
	'use strict';

	angular
		.module('app.addTrip', [])
		.controller('addTripCtrl', addTripCtrl)
		.directive('focusMe', focusMe);

	function addTripCtrl($scope, $state, $ionicModal,$ionicPlatform,$cordovaGeolocation) {
		/* jshint validthis: true */
		var vm = $scope;
		$scope.placeLocation;
		vm.title = "New Trip";
		vm.newPlace = new Object();
		vm.addLocation = function(){
			vm.newPlace.coordinates = $scope.placeLocation;
            vm.newPlace.locationDetails = $scope.placeLocation;
		}
		vm.details = function (details) {
            vm.newPlace.coordinates = { latitude: details.geometry.location.lat(), longitude: details.geometry.location.lng() };
            vm.newPlace.locationDetails = details
        };
         $scope.locationChanged = function (location) {
   alert(location);
 };
        $ionicPlatform.ready(function() {
  			var posOptions = {timeout: 10000, enableHighAccuracy: false};
  			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function (position) {
					var lat  = position.coords.latitude
					var long = position.coords.longitude
				}, function(err) {
						// error
				});
		});

		//Place Modal
	   $ionicModal.fromTemplateUrl('templates/modal.html', {
    		scope: $scope
  		}).then(function(modal) {
  			$scope.newPlace = new Object();
    		$scope.modal = modal;
  		});
  		//Location Modal
	   $ionicModal.fromTemplateUrl('templates/locationModal.html', {
    		scope: $scope
  		}).then(function(modal) {
  			// $scope.newPlace = new Object();
    		$scope.locationModal = modal;
  		});		
	}

	function focusMe($timeout){
		return {

			   link: function(scope, element, attrs) {
				$timeout(function() {
						element[0].focus();
						if(typeof(cordova) != "undefined") {
							cordova.plugins.Keyboard.show();
						}
					}, 150);
					}
				}
		}
})();