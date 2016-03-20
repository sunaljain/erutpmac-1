(function() {
	'use strict';

	angular
		.module('app.addTrip', [])
		.controller('addTripCtrl', addTripCtrl)
		.directive('focusMe', focusMe);

	function addTripCtrl($scope, $state, $ionicModal) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "New Trip";

		//StatusBar.hide();
		  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
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