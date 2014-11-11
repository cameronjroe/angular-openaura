(function (window, angular, undefined) {
    'use strict';

    var settings = {};

    angular.module('openaura', [])
        .value('settings', settings)
        .provider('OpenAura', function () {

            settings.apiKey = null;

            this.setApiKey = function (key) {
                return settings.apiKey = key;
            };

            this.getApiKey = function () {
                return settings.apiKey;
            };

            /**
             * SDK Version
             */
            settings.version = 'v1';

            settings.apiBase = ['http://api.openaura.com', settings.version].join('/');

            this.$get = ['$q', '$http', function($q, $http) {

                function OpenAura() {

                }

                OpenAura.prototype.api = function (endpoint, method, params, data, headers) {
                    var dfd = $q.defer();

                    $http({
                        url: settings.apiBase + endpoint,
                        method: method ? method : 'GET',
                        params: params,
                        data: data,
                        headers: headers
                    })
                    .success(function (data) {
                        dfd.resolve(data);
                    })
                    .error(function (data) {
                        dfd.reject(data);
                    });

                    return dfd.promise;
                };

                OpenAura.prototype.getArtistSource = function () {

                };

                OpenAura.prototype.getArtistProviderSource = function () {

                };

                OpenAura.prototype.getSource = function() {
                    
                };

                OpenAura.prototype.getArtistClassic = function() {
                    
                };

                OpenAura.prototype.getArtistParticle = function() {
                    
                };

                OpenAura.prototype.getParticle = function() {
                    
                };

                OpenAura.prototype.getSourceParticle = function() {
                    
                };

                OpenAura.prototype.getArtistInfo = function() {
                };

                OpenAura.prototype.getArtistDelta = function() {
                    
                };

                OpenAura.prototype.searchArtistParticles = function() {
                };

                OpenAura.prototype.searchAllArtists = function () {

                };

                return new OpenAura();

            }];
            
        });

}(window, angular));