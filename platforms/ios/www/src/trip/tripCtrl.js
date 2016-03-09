(function() {
	'use strict';

	angular
		.module('app.trip', [])
		.controller('tripCtrl', tripCtrl);

	function tripCtrl($scope, $state) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "Campture";
	}
})();