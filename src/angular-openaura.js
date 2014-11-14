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
                    this.defaultIdType = 'oa:artist_id';
                }

                OpenAura.prototype.api = function (endpoint, method, params, data, headers) {
                    var dfd = $q.defer();

                    params.api_key = params.api_key || settings.apiKey;

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

                OpenAura.prototype.getArtistSource = function (id, idType) {
                    var options = {};
                    options.id_type = idType || this.defaultIdType;

                    return this.api('/source/artists/' + encodeURIComponent(id), 'GET', options);
                };

                OpenAura.prototype.getArtistProviderSource = function (id, providerId, idType) {
                    var options = {};
                    options.id_type = idType || this.defaultIdType;

                    return this.api('/source/artists/' + id + '/providers/' + providerId, 'GET', options);
                };

                OpenAura.prototype.getSource = function(sourceId, idType) {
                    var options = {};
                    options.id_type = idType || this.defaultIdType;

                    return this.api('/source/sources/' + sourceId, 'GET', options);
                };

                OpenAura.prototype.getArtistClassic = function(id, idType) {
                    var options = {};
                    options.id_type = idType || this.defaultIdType;

                    return this.api('/classic/artists/' + id, 'GET', options);
                };

                OpenAura.prototype.getArtistParticle = function(id, params) {
                    var options = {};
                    var params = params || {};
                    if (params) {
                        angular.extend(options, params);
                    }
                    options.id_type = params.idType || this.defaultIdType;

                    return this.api('/particles/artists/' + id,'GET', options);
                };

                OpenAura.prototype.getParticle = function(particleId, idType) {
                    var options = {};
                    options.id_type = idType || 'oa:particle_id';

                    return this.api('/particles/particle/' + particleId, 'GET', options);
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