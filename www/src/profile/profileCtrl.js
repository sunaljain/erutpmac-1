(function() {
	'use strict';

	angular
		.module('app.profile', [])
		.controller('profileCtrl', profileCtrl);

	function profileCtrl($scope, $state) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "Profile";
	}
})();