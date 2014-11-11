'use strict';
/* global getJSONFixture */
describe("angular-openaura", function() {
    
    describe("OpenAuraProvider", function() {
        
        var openAuraProvider;

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

        var OpenAura;

        beforeEach(inject(function (_OpenAura_) {
            OpenAura = _OpenAura_;
        }));

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

        describe("OpenAura.api", function() {
            
            var $httpBackend;
            var OpenAura;
            var api = 'http://api.openaura.com/v1';

            beforeEach(inject(function (_OpenAura_, _$httpBackend_) {
                OpenAura = _OpenAura_;
                $httpBackend = _$httpBackend_;
                jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it("should call the api with params", function() {
                $httpBackend.when('GET', api + '/search/artists?api_key=test&q=Drake')
                    .respond(getJSONFixture('search.artists.json'));

                var result;
                OpenAura.api('/search/artists', 'GET', {
                    q: 'Drake',
                    api_key: 'test'
                }).then(function (res) {
                    result = res;
                });

                $httpBackend.flush();

                expect(result).toBeDefined();
            });

        });

        describe("OpenAura.getArtistSource", function() {
            
            var $httpBackend;
            var $rootScope;
            var OpenAura;
            var api = 'http://api.openaura.com/v1';

            beforeEach(inject(function(_$rootScope_, _$httpBackend_, _OpenAura_) {
                $httpBackend = _$httpBackend_;
                $rootScope = _$rootScope_;
                OpenAura = _OpenAura_;
                jasmine.getJSONFixtures().fixturesPath = 'base/test/mock';
            }));

        });
    });

});