# angular-openaura

Angular Service to connect to  [OpenAura API](http://developer.openaura.com/docs/)

## Usage

Install angular-openaura via bower. Use the --save property to save into your bower.json file.
```shell
bower install angular-openaura --save
```

Include spotify into your angular module
```javascript
var app = angular.module('app', ['openaura']);
```

Configure your API key:
```javascript
app.config(function (OpenAuraProvider) {
  OpenAuraProvider.setApiKey('<API_KEY>');
});
```

Inject OpenAura into a controller to gain access to all the functions available
```javascript
app.controller('MainCtrl', function (OpenAura) {

});
```


###/source
####getArtistSource - GET /source/artists/{id}
Get all source definitions for an artist by artist id.
```javascript
OpenAura.getArtistSource(id, idType);
```
id - (*Required*) {string} Artist Anchor ID

idType - (*Optional*) {string} oa:anchor_id, oa:artist_id, or musicbrainz:gid. Defaults to OpenAura Anchor ID

Example:
```javascript
OpenAura.getArtistSource('47').then(function (data) {
  console.log(data);
});
```

####getArtistProviderSource - GET /source/artists/{id}/providers/{pid}
Get all source definitions for an artist by artist id and provider id.
```javascript
OpenAura.getArtistProviderSource(id, providerId, idType);
```
id - (*Required*) {string} Artist Anchor ID

providerId - (*Required*) {string} OpenAura Provider Id

idType - (*Optional*) {string} oa:anchor_id, oa:artist_id, or musicbrainz:gid. Defaults to OpenAura Anchor ID

Example:
```javascript
OpenAura.getArtistProviderSource('47', '1').then(function (data) {
  console.log(data);
});
```

####getSource - GET /source/sources/{id}
Get single source definition by source id.
```javascript
OpenAura.getSource(sourceId, idType);
```
sourceId - (*Required*) {string} Object id of source

idType - (*Optional*) {string} oa:anchor_id, oa:artist_id, or musicbrainz:gid. Defaults to OpenAura Anchor ID

Example:
```javascript
OpenAura.getSource('145').then(function (data) {
  console.log(data);
});
```

##/classic
####getArtistClassic - GET /classic/artists/{id}
Info Classic for artist by id
```javascript
OpenAura.getArtistClassic(id, idType);
```
id - (*Required*) {string} Artist Anchor ID

idType - (*Optional*) {string} oa:anchor_id, oa:artist_id, or musicbrainz:gid. Defaults to OpenAura Anchor ID

Example:
```javascript
OpenAura.getArtistClassic('47').then(function (data) {
  console.log(data);
});
```

####getArtistParticle - GET /particles/artists/{id}
Get particle collection by artist id
```javascript
OpenAura.getArtistParticle(id, params);
```
id - (*Required*) {string} Artist Anchor ID

params - (*Optional*) {object}
- offset - Offset from beginning of aura
- limit - Maximum number of particles returned
- sort - Sort order for particle list. Defaults to 'date' (date of post descending)


Example:
```javascript
OpenAura.getArtistParticle('47', {
	offset: 2,
	limit: 1,
	sort: 'date'
}).then(function (data) {
  console.log(data);
});
```

####getParticle - GET /particles/particle/{id}
Get particle collection of a single particle by particle id
```javascript
OpenAura.getParticle(id, idType);
```
id - (*Required*) {string} Object id of particle

idType - (*Optional*) {string} oa:particle_id. Defaults to OpenAura Particle ID

Example:
```javascript
OpenAura.getParticle('545fd5ec83ba4dfebd12733b').then(function (data) {
  console.log(data);
});
```

####getSourceParticle - GET /particles/sources/{id}
Get particle collection by source id
```javascript
OpenAura.getSourceParticle(id, idType, options);
```
id - (*Required*) {string} Object id of particle

idType - (*Optional*) {string} oa:source_id

options - (*Optional*) {object}
- offset - Offset from beginning of particle list
- limit - Maximum number of particles returned

Example:
```javascript
OpenAura.getSourceParticle('4998742').then(function (data) {
  console.log(data);
});
```

##/info
####getArtistInfo - GET /info/artists/{id}
Anchor info for artist by id
```javascript
OpenAura.getArtistInfo(id, params);
```
id - (*Required*) {string} Object id of particle

params - (*Optional*) {object}
- id__type - oa:anchor_id, oa:artist_id, or musicbrainz:gid. Defaults to OpenAura Anchor ID
- with_sources - true if you want source data included in the info response. Defaults to false

Example:
```javascript
OpenAura.getArtistInfo('47').then(function (data) {
  console.log(data);
});
```
##/delta
####getArtistDelta - GET /delta/artist_info
Return oa:anchor_ids for artist info objects which have changed since time
```javascript
OpenAura.getArtistDelta(options);
```
options - (*Optional*) {object}
- since_time - An ISO 8601 formatted time stringDefaults to OpenAura Anchor ID
- seconds_ago - An integer representing a time interval in seconds taken from the current time

Example:
```javascript
OpenAura.getArtistDelta({
	since_time: '2014-11-02'
}).then(function (data) {
  console.log(data);
});
```

##/search
####searchArtistParticles - GET /search/artists
Search OA artists with particles
```javascript
OpenAura.searchArtistParticles(q, params);
```
q - (*Required*) {string} Query string

params - (*Optional*) {object}
- offset - Offset from beginning search results
- limit - Maximum number of search results

Example:
```javascript
OpenAura.searchArtistParticles('Calvin Harris').then(function (data) {
  console.log(data);
});
```

####searchAllArtists - GET /search/artists_all
Search all OA artists
```javascript
OpenAura.searchAllArtists(q, params);
```
q - (*Required*) {string} Query string

params - (*Optional*) {object}
- offset - Offset from beginning search results
- limit - Maximum number of search results

Example:
```javascript
OpenAura.searchAllArtists('Calvin Harris').then(function (data) {
  console.log(data);
});
```