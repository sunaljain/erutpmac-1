(function() {
	'use strict';

	angular
		.module('app.addTrip', [])
		.controller('addTripCtrl', addTripCtrl)
		.directive('focusMe', focusMe);

	function addTripCtrl($scope, $state) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "New Trip";

		//StatusBar.hide();

		$scope.$on('$ionicView.beforeLeave', function(){
			StatusBar.show();
		});

		$scope.$on('$ionicView.beforeEnter', function(){
			StatusBar.hide();
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