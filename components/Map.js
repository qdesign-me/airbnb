import React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const coordinates = searchResults.map((coord) => ({
    latitude: coord.lat,
    longitude: coord.long,
  }));

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: '50vw',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });
  console.log('before');
  useEffect(() => {
    console.log('inside');
  }, []);

  console.log('after');

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/qdesign-by/cks5maw8j8rgx17o50huyfb9j"
        mapboxApiAccessToken={process.env.mapbox_key}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        {searchResults.map((result) => (
          <div key={result.long}>
            <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetTop={-10}>
              <p onClick={(e) => setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">
                🕊{' '}
              </p>
            </Marker>
            {selectedLocation.long == result.long ? (
              <Popup onClose={() => setSelectedLocation({})} closeOnClick={true} latitude={result.lat} longitude={result.long}>
                {result.title}
              </Popup>
            ) : null}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
}

export default Map;
