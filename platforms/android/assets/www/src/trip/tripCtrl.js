(function() {
	'use strict';

	angular
		.module('app.trip', [])
		.controller('tripCtrl', ['$scope', '$state', 'AccountService','TripService', tripCtrl]);

	function tripCtrl($scope, $state, accountService, tripService) {
		/* jshint validthis: true */
		var vm = $scope;

		vm.title = "Campture";

		//====== Scope Variables==========
        //================================
        $scope.currentUserObj = Parse.User.current();
        $scope.userObj;
        $scope.tripTabIndex = 0;
        $scope.allMarkers = new Array();
        $scope.isMyProfile = false;
        // $scope.pageUrl = $location.$$absUrl;
        $scope.likeId;
        $scope.isLikeDisabled = false;
        $scope.myInterval = 2000;
        $scope.modalCaption = "";
        $scope.timelineImages = new Array();
        var bounds = new google.maps.LatLngBounds();
        if ($scope.currentUserObj) {
            $scope.myProfile = $scope.currentUserObj.get("facebook_profile");
        }
        accountService.getTripById($state.params.tripId, function (data) {
            $scope.$apply(function () {
                $scope.userObj = data.user
                if ($scope.currentUserObj) {
                    $scope.isTripLikedByUser();
                    if ($scope.userObj.id == $scope.currentUserObj.id) {
                        $scope.isMyProfile = true;
                    }
                }
                $scope.trip = data;
                accountService.getRelatedTrips($scope.trip.tags, function (data) {
                    if (data) {
                        $scope.$apply(function () {
                            $scope.relatedTrips = data;
                            angular.forEach($scope.relatedTrips, function (trip) {
                                try {
                                    var initUrl = trip.main_image ? trip.main_image.image_url : trip.visited_places[0].images[0].image_url;
                                    trip.cropped_image_url = $rootScope.getCroppedTripImageUrl(initUrl);
                                } catch (e) {
                                    console.log(e);
                                }

                            });
                        });
                    }
                });
                var markerId = 0;
                angular.forEach($scope.trip.visited_places, function (place, key) {
                    try {
                        $scope.allMarkers.push({ latitude: place.coordinates.latitude, longitude: place.coordinates.longitude, title: place.location, id: markerId })
                        var latlng = new google.maps.LatLng(place.coordinates.latitude, place.coordinates.longitude);
                        bounds.extend(latlng);
                        markerId++;
                    }
                    catch (e) {
                        console.log(e);
                    }
                });
                $scope.map = { center: { latitude: $scope.allMarkers[0].latitude, longitude: $scope.allMarkers[0].longitude }, zoom: 15 };
                $scope.polylines = [
                    {
                        id: 1,
                        path: $scope.allMarkers,
                        stroke: {
                            color: '#f56c35',
                            weight: 3
                        },
                        editable: false,
                        draggable: false,
                        geodesic: false,
                        visible: true,
                        icons: [{
                            icon: {
                                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
                            },
                            offset: '25px',
                            repeat: '50px'
                        }]
                    }
                    ];
                angular.forEach($scope.trip.visited_places, function (place, key) {
                    angular.forEach(place.images, function (image, key) {
                        $scope.timelineImages.push(image);
                    });
                });
            });
        });
        //---RelatedTrips----        

        $scope.updateTripTabPos = function (pos) {
            $scope.tripTabIndex = pos;
        }

        $scope.isMyTripTimeline = function () {
            if ($scope.trip.user.id == userObj.id) {
                return true;
            }
            else {
                false;
            }
        }

        //Map
        $scope.map = { center: { latitude: 21.0000, longitude: 78.0000 }, zoom: 4 };


        //Comments and Likes
        $scope.getTripComments = function () {
            tripService.getTripComments($state.params.tripId, function (data) {
                $scope.$apply(function () {
                    if (data) {
                        $scope.tripComments = data;
                    }
                });
            });
        }
        $scope.postComment = function () {
            var myComment = {
                trip_pointer: $state.params.tripId,
                user_pointer: $scope.userObj.id,
                text: $scope.myCommentText
            }
            tripService.postComment(myComment, function (data) {
                $scope.$apply(function () {
                    if (data) {
                        $scope.myCommentText = undefined;
                        $scope.getTripComments();
                    }
                });
            });
        }
        $scope.isTripLikedByUser = function () {
            var likeObj = {
                trip_pointer: $state.params.tripId,
                user_pointer: $scope.currentUserObj.id
            }
            tripService.isTripLikedByUser(likeObj, function (data) {
                if (data) {
                    $scope.likeId = data;
                    $scope.isLikeDisabled = false;
                    $scope.$apply();
                }
            })
        }
        $scope.likeTrip = function () {
            $scope.trip.total_likes++;
            var likeObj = {
                trip_pointer: $state.params.tripId,
                user_pointer: $scope.currentUserObj.id
            }
            tripService.tripLike($scope.trip.total_likes, likeObj, function (data) {
                if (data) {
                    var x = data;
                    $scope.isTripLikedByUser();
                }
                else {
                    $scope.trip.total_likes--;
                }
            });
        };
        $scope.unlikeTrip = function () {
            $scope.trip.total_likes--;
            tripService.tripUnlike($scope.likeId, $state.params.tripId, $scope.trip.total_likes, function (data) {
                if (data) {
                    var x = data;
                    $scope.likeId = undefined;
                    $scope.isLikeDisabled = false
                    $scope.$apply();
                }
                else {
                    $scope.trip.total_likes++;
                }
            });
        };
        $scope.tripLikeUnlike = function () {
            if ($scope.currentUserObj) {
                if ($scope.likeId) {
                    $scope.likeId = undefined;
                    $scope.unlikeTrip();
                }
                else {
                    $scope.likeId = new Object();
                    $scope.likeTrip();
                }
            }
            else{
                //$("#facebook-login-modal2").css("display", "block");
                $scope.isLikeDisabled = false;
            }
        }

        //----Modal-----//
        $scope.modalShown = false;
        $scope.toggleModal = function (imageUrl, caption) {
            $('#modalImg').attr('src', '');
            $scope.modalImageUrl = undefined;
            $scope.modalShown = !$scope.modalShown;
            $scope.modalImageUrl = imageUrl;
            $scope.modalCaption = caption;
        };

        $scope.searchFilteredFeed = function (searchText) {
            $location.path('/feed?');
        }

        $scope.scrollToCommentSection = function () {
            $('html, body').animate({
                scrollTop: $("#comments").offset().top - 100
            }, 500);
        }
        $scope.shareOnFacebook = function () {
            FB.ui({
                method: "feed",
                link: $scope.pageUrl,
                caption: $scope.trip.title,
                description: $scope.trip.introduction,
                picture: $scope.trip.main_image.image_url
            });
        }
        $scope.getCroppedTripImageUrl = function (url, transString) {
            try {
                if (!transString) {
                    transString = 'upload/c_fill,h_440,w_440/';
                }   
                var arr = url.split('upload/');
                var croppedUrl = arr[0] + transString + arr[1];
            } catch (e) {
                console.log(e);
            }
            return croppedUrl;
        };
	}
})();