(function() {
	'use strict';

	angular
		.module('app.feed', [])
		.controller('feedCtrl', feedCtrl);

	function feedCtrl($scope, $state) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "Campture";
	}

})();