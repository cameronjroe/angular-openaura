(function (window, angular, undefined) {
    'use strict';

    var settings = {};

    angular.module('openaura', [])
        .value('settings', settings)
        .provider('OpenAura', function () {

            settings.apiKey = null;

            this.setApiKey = function (key) {
                settings.apiKey = key;
                return settings.apiKey;
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
                    if (params) {
                        params.id_type = params.idType || this.defaultIdType;
                        delete params.idType;
                        angular.extend(options, params);
                    } else {
                        options.id_type = this.defaultIdType;
                    }

                    return this.api('/particles/artists/' + id,'GET', options);
                };

                OpenAura.prototype.getParticle = function(particleId, idType) {
                    var options = {};
                    options.id_type = idType || 'oa:particle_id';

                    return this.api('/particles/particle/' + particleId, 'GET', options);
                };

                OpenAura.prototype.getSourceParticle = function(sourceId, idType) {
                    var options = {};
                    options.id_type = idType || 'oa:source_id';

                    return this.api('/particles/sources/' + sourceId, 'GET', options);
                };

                OpenAura.prototype.getArtistInfo = function(id, params) {
                    var options = {};
                    if (params) {
                        params.id_type = params.idType || 'oa:artist_id';
                        delete params.idType;
                        angular.extend(options, params);
                    } else {
                        options.id_type = 'oa:artist_id';
                    }

                    return this.api('/info/artists/' + id, 'GET', options);
                };

                OpenAura.prototype.getArtistDelta = function(options) {
                    if (!options) {
                        console.warn('pass since_time or seconds_ago paramaters');
                    }

                    return this.api('/delta/artist_info', 'GET', options);
                };

                OpenAura.prototype.searchArtistParticles = function(q, params) {
                    var options = {};
                    options.q = q;
                    if (params) {
                        angular.extend(options, params);
                    }

                    return this.api('/search/artists', 'GET', options);
                };

                OpenAura.prototype.searchAllArtists = function (q, params) {
                    var options = {};
                    options.q = q;
                    if (params) {
                        angular.extend(options, params);
                    }

                    return this.api('/search/artists_all', 'GET', options);
                };

                return new OpenAura();

            }];
            
        });

}(window, angular));