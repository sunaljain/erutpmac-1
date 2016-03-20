angular.module('app', ['ionic', 'app.routes', 'app.services', 'app.headerbar', 'app.login', 'app.feed', 'app.profile', 'app.trip', 'app.addTrip'])
.run(function($ionicPlatform) {
	Parse.initialize("hqRCJWWJJhduQBOceJYMnKUh8rt5prJ2WyUfDkmp", "M7ZPrFMJoEopzBvOGCmynUbN5qwedkTeY32hFmpy");
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});