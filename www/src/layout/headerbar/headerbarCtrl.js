(function() {
	'use strict';

	angular
		.module('app.headerbar', [])
		.controller('headerbarCtrl', headerbarCtrl)
		.directive('camptureHeaderBar', camptureHeaderBar);

	function headerbarCtrl() {

	}

	function camptureHeaderBar() {
		return {
			scope: {
				title: '@title'
			},
			restrict : "E",
			templateUrl: "src/layout/headerbar/headerbar.html"
		}
	}
})();