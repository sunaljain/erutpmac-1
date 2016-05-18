(function() {
	'use strict';

	angular
	.module('app.addTrip', [])
	.controller('addTripCtrl', addTripCtrl)
	.directive('focusMe', focusMe);

	function addTripCtrl($scope, $state, $ionicModal,$ionicPlatform,$cordovaGeolocation,$cordovaImagePicker) {
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
		vm.formatTags = function () {
            if ($scope.rawTags) {
                var tags = $scope.rawTags.split(',');
                angular.forEach(tags, function (value, key) {
                    $scope.newTrip.tags.push(value.trim());
                });
                $scope.rawTags = undefined;
            }
        }
        vm.addNewPlace = function () {
        	$scope.newPlace = new Object();
          $scope.modal.show();
        }

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
		vm.getMainImage = function() {       
        // Image picker will load images according to these settings
        var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 800,
        height: 800,
        quality: 80            // Higher is better
    };
    $ionicPlatform.ready(function() {
    	$cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
                for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);   // Print image URI
        }
    }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
    });
    });
};
		//Place Modal
		$ionicModal.fromTemplateUrl('templates/modal.html', {
			scope: $scope
		}).then(function(modal) {			
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