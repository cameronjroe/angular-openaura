'use strict';

angular.module('exampleApp', [
        'openaura'
    ])
    .config(['OpenAuraProvider', function (OpenAuraProvider) {
        
        OpenAuraProvider.setApiKey('5817b5ee0066718f5ceb4a37526a5a839018ef53');

    }])
    .controller('ExampleCtrl', ['$scope', 'OpenAura', function ($scope, OpenAura) {
        
        $scope.images = [];
        $scope.isLoading = false;
        $scope.search = function (input) {
            OpenAura.searchAllArtists(input)
                .then(function (res) {
                    $scope.isLoading = true;
                    var artist = res[0];
                    $scope.images = [];
                    OpenAura.getArtistClassic(artist.oa_artist_id).then(function (res) {
                      if (res.profile_image && res.profile_image.url) {
                          $scope.images.push(res.profile_image.url);
                      } else if (res.artist_images) {
                        $scope.images.push(res.artist_images[0].url);
                      } else {

                      }
                      $scope.isLoading = false;
                    });
                });
        };

    }]);