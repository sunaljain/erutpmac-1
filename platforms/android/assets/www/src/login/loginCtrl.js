(function() {
	'use strict';

	angular
		.module('app.login', [])
		.controller('loginCtrl', loginCtrl);

	function loginCtrl($scope, $state) {
		/* jshint validthis: true */
		var vm = this;

		vm.title = "Welcome";
		$scope.login = login;
		$scope.skip = skip;

		function login(){
			console.log("logged in!!");
			$state.go("tabs.feed");
		}

		function skip(){
			$state.go("tabs.feed");
		}

	}
})();