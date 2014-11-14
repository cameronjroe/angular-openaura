'use strict';

angular.module('exampleApp', [
        'openaura'
    ])
    .config(['OpenAuraProvider', function (OpenAuraProvider) {
        
        OpenAuraProvider.setApiKey('5817b5ee0066718f5ceb4a37526a5a839018ef53');

    }])
    .controller('ExampleCtrl', ['$scope', 'OpenAura', function ($scope, OpenAura) {
        
        $scope.images = [];

        $scope.search = function (input) {
            OpenAura.searchAllArtists(input)
                .then(function (res) {
                    var artists = res.slice(0, 10);
                    $scope.images = [];
                    angular.forEach(artists, function (o) {

                        OpenAura.getArtistClassic(o.oa_artist_id).then(function (res) {
                            if (res.profile_image.url) {
                                $scope.images.push(res.profile_image.url);
                            }
                        });
                    
                    });
                });
        };

    }]);