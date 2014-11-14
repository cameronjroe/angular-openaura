'use strict';
/* global getJSONFixture */
describe("angular-openaura", function() {
    
    var openAuraProvider;

    describe("OpenAuraProvider", function() {

        beforeEach(function () {
            angular.module('testApp', function () {})
                .config(function (OpenAuraProvider) {
                    openAuraProvider = OpenAuraProvider;
                });
            
            module('openaura', 'testApp');

            inject(function(){});
        });

        it("should be defined", function() {
            expect(openAuraProvider).toBeDefined();
        });

        it("should set the api key", function() {
            expect(openAuraProvider.setApiKey('asdf')).toBe('asdf');
        });

        it("should get the api key", function() {
            openAuraProvider.setApiKey('asdf');
            expect(openAuraProvider.getApiKey()).toBe('asdf');
        });

    });

    describe("OpenAura", function() {
        
        beforeEach(module('openaura'));

        var $httpBackend;
        var $rootScope;
        var OpenAura;
        var api = 'http://api.openaura.com/v1';

        beforeEach(inject(function (_OpenAura_, _$httpBackend_, _$rootScope_) {
            OpenAura = _OpenAura_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it("should be defined", function() {
            expect(OpenAura).toBeDefined();
        });

        it("should be an object", function() {
            expect(typeof OpenAura).toBe('object');
        });

        it("should have a method api()", function() {
            expect(OpenAura.api).toBeDefined();
        });

        it("should have a method getArtistSource()", function() {
            expect(OpenAura.getArtistSource).toBeDefined();
        });

        it("should have a method getArtistProviderSource()", function() {
            expect(OpenAura.getArtistProviderSource).toBeDefined();
        });

        it("should have a method getSource()", function() {
            expect(OpenAura.getSource).toBeDefined();
        });

        it("should have a method getArtistClassic()", function() {
            expect(OpenAura.getArtistClassic).toBeDefined();
        });

        it("should have a method getArtistParticle()", function() {
            expect(OpenAura.getArtistParticle).toBeDefined();
        });

        it("should have a method getParticle()", function() {
            expect(OpenAura.getParticle).toBeDefined();
        });

        it("should have a method getSourceParticle()", function() {
            expect(OpenAura.getSourceParticle).toBeDefined();
        });

        it("should have a method getArtistInfo()", function() {
            expect(OpenAura.getArtistInfo).toBeDefined();
        });

        it("should have a method getArtistDelta()", function() {
            expect(OpenAura.getArtistDelta).toBeDefined();
        });

        it("should have a method searchArtistParticles()", function() {
            expect(OpenAura.searchArtistParticles).toBeDefined();
        });

        it("should have a method searchAllArtists()", function() {
            expect(OpenAura.searchAllArtists).toBeDefined();
        });

        describe("api", function() {

            beforeEach(inject(function (_OpenAura_, _$httpBackend_) {
                openAuraProvider.setApiKey('asdf');
            }));

            it("should call the api with params", function() {

                $httpBackend.when('GET', api + '/search/artists?api_key=asdf&q=Drake')
                    .respond(getJSONFixture('search.artists.json'));

                var result;
                OpenAura.api('/search/artists', 'GET', {
                    q: 'Drake',
                }).then(function (res) {
                    result = res;
                });

                $httpBackend.flush();

                expect(result).toBeDefined();

            });

        });

        describe("OpenAura.getArtistSource", function() {


            it("should make a call to http://api.openaura.com/v1/source/artists", function() {

                spyOn(OpenAura, 'api');

                OpenAura.getArtistSource('47', 'oa:artist_id');

                expect(OpenAura.api).toHaveBeenCalledWith('/source/artists/47', 'GET', {
                    id_type: 'oa:artist_id'
                });

            });

            it("should return an array of sources", function() {
                
                $httpBackend.when('GET', api + '/source/artists/47?id_type=oa:artist_id')
                    .respond(getJSONFixture('source.artists.json'));

                OpenAura.getArtistSource('47')
                    .then(function (res) {
                        expect(res).toBeDefined();
                        expect(res.sources.length).toBeGreaterThan(1);
                    });

                $httpBackend.flush();

            });

        });

        describe("OpenAura.getArtistProviderSource", function() {

            it("should make a call to http://api.openaura.com/v1/source/artists/:id/providers/:pid and return an array of sources from provider", function() {

                $httpBackend.when('GET', api + '/source/artists/47/providers/1?id_type=oa:artist_id')
                    .respond(getJSONFixture('source.artists.providers.json'));

                OpenAura.getArtistProviderSource('47', '1')
                    .then(function (res) {
                        expect(res).toBeDefined();
                        expect(res.sources[0].oa_provider_id).toBe(1);
                    });

                $httpBackend.flush();

            });

        });


        describe("getSource()", function() {
            
            it("should make a call to http://api.openaura.com/v1/source/sources/:id", function() {
            
                $httpBackend.when('GET', api + '/source/sources/145?id_type=oa:artist_id')
                    .respond(getJSONFixture('source.source.json'));

                OpenAura.getSource('145').then(function (res) {
                    expect(res.name).toBe('taylorswift13');
                });

                $httpBackend.flush();

            });

        });

        describe("getArtistClassic()", function() {
            
            it("should make a call to http://api.openaura.com/v1/classic/artists/:id", function() {
                
                $httpBackend.when('GET', api + '/classic/artists/47?id_type=oa:artist_id')
                    .respond(getJSONFixture('classic.artists.json'));

                OpenAura.getArtistClassic('47').then(function (res) {
                    expect(res.name).toBe('Taylor Swift');
                    expect(res.artist_images.length).toBeGreaterThan(1);
                });

                $httpBackend.flush();

            });

        });

        describe("getArtistParticle()", function() {
            
            it("should make a call to http://api.openaura.com/v1/particles/artists/:id", function() {
                
                $httpBackend.when('GET', api + '/particles/artists/47?id_type=oa:artist_id')
                    .respond(getJSONFixture('particles.artists.json'));

                OpenAura.getArtistParticle('47').then(function (res) {
                    expect(res.particles.length).toBeGreaterThan(1);

                });

                $httpBackend.flush();

            });

            it("should accept additional offset, limit, and sort paramaters", function() {
                
                function sortFixture(a) {
                    return a.sort(function (a, b) {
                        if (a.date < b.date) {
                            return 1;
                        } else if (b.date < a.date) {
                            return -1;
                        } else {
                            return 0;
                        }
                    });
                }

                $httpBackend.when('GET', api + '/particles/artists/47?id_type=oa:artist_id&limit=1&offset=2&sort=date')
                    .respond(getJSONFixture('particles.artists.json'));

                OpenAura.getArtistParticle('47', {
                    offset: 2,
                    limit: 1,
                    sort: 'date'
                }).then(function (res) {
                    var sorted = sortFixture(res.particles).slice(0, 1);

                    expect(sorted.length).toBe(1);
                    expect(sorted[0].date).toBe('2014-11-13T04:20:57.000Z');
                });

                $httpBackend.flush();

            });

        });

        describe("getParticle()", function() {
            
            it("should get particle by id", function() {
                
                $httpBackend.when('GET', api + '/particles/particle/545fd5ec83ba4dfebd12733b?id_type=oa:particle_id')
                    .respond(getJSONFixture('particles.particle.json'));

                OpenAura.getParticle('545fd5ec83ba4dfebd12733b').then(function (res) {
                    expect(res.oa_particle_id).toBe('545fd5ec83ba4dfebd12733b');
                });

                $httpBackend.flush();

            });

        });

        describe("getSourceParticle()", function() {
            

        });











    });

});