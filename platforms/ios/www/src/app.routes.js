(function() {
	'use strict';

	angular
		.module('app.routes', [])
		.config(config)

	function config ($stateProvider, $urlRouterProvider) {

		$stateProvider
		
			.state('welcome', {
				url: '/login',
				controller: 'loginCtrl',
				templateUrl: 'src/login/login.html'
			})

			.state('tabs', {
				url: '/tabs',
				abstract: true,
				templateUrl: 'src/layout/tabmenu/tabmenu.html'
			})

			.state('tabs.feed', {
				url: '/feed',
				views: {
					'feed': {
						templateUrl: 'src/feed/feed.html',
						controller: 'feedCtrl'
					}
				}
			})
			
			.state('tabs.profile', {
				url: '/profile',
				views: {
					'profile': {
						templateUrl: 'src/profile/profile.html',
						controller: 'profileCtrl'
					}
				}
			})

			.state('tabs.addTrip', {
				url: '/add_trip',
				views: {
					'add_trip': {
						templateUrl: 'src/addTrip/addTrip.html',
						controller: 'addTripCtrl'
					}
				}
			})
			// .state('tabs.addLocation', {
			// 	url: '/add_location',
			// 	views: {
			// 		'add_location': {
			// 			templateUrl: 'src/addTrip/addLocation.html',
			// 			controller: 'addTripCtrl'
			// 		}
			// 	}
			// })

			.state('trip', {
				url: '/trip',
				templateUrl: 'src/trip/trip.html',
				controller: 'tripCtrl'
			});

		$urlRouterProvider.otherwise('/login');
	}
})();