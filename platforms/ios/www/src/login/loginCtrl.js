(function() {
	'use strict';

	angular
		.module('app.login', [])
		.controller('loginCtrl',['$scope', '$state','$localStorage', 'AccountService', loginCtrl]);

	function loginCtrl($scope, $state,$localStorage,accountService) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "Welcome";
		$scope.login = login;
		$scope.skip = skip;
		$scope.loginWithFacebook = loginWithFacebook;


		function loginWithFacebook () {			
            Parse.FacebookUtils.logIn(null, {
                success: function (user) {
                    if (!user.existed()) {
                        accountService.getMyProfile().then(function (response) {
                            accountService.updateUserFacebookProfile(response, user.id, function (data) {
                                $scope.$apply(function () {
                                    if (data) {
                                        var x = data;
                                        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                                        $localStorage.currentUser = response;
                                    }
                                });
                            });
                        });
                    }
                    else {
                        $scope.userObj = JSON.parse(JSON.stringify(Parse.User.current()));
                        $scope.$apply();
                    }
                    $state.go("tabs.feed");
                },
                error: function (user, error) {
                    console.log("Cancelled");
                }
            });
        };
		function login(){
			console.log("logged in!!");
			$state.go("tabs.feed");
		}

		function skip(){
			$state.go("tabs.feed");
		}

	}
})();