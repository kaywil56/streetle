import { Loader } from "@googlemaps/js-api-loader";
import React, { useRef, useEffect, useState } from "react";
import './Map.css'

const loader = new Loader({
  apiKey: import.meta.env.VITE_STREET_VIEW_API_KEY,
  version: "weekly",
});

const Map = ({ currentLocation }) => {
  const ADJUSTMENT_AMOUNT = 0.04
  let mapElement = useRef(null);
  const [loading, setLoading] = useState(true);
  let googleStreetViewService;
  let panorama;
  // Value for panoramas nearest lat and lang based and given coords
  let nearestLatLng;
  // Value for random adjustment of given coords 
  let adjust;
  let panoOptions = {
    scrollwheel: true,
    clickToGo: false,
    disableDefaultUI: true
  };

  // Fetch a new panorama
  const getNearestPanorama = () => {
    setLoading(true);
    loader.load().then((google) => {
      // Initialize google street view service
      googleStreetViewService = new google.maps.StreetViewService();
      // Initialize panorama
      panorama = new google.maps.StreetViewPanorama(mapElement.current);
      adjust = Math.random() * ADJUSTMENT_AMOUNT;
      googleStreetViewService
        .getPanorama(
          {
            location: new google.maps.LatLng({
              lat: currentLocation?.latitude + adjust,
              lng: currentLocation?.longitude + adjust,
            }),
            source: google.maps.StreetViewSource.OUTDOOR,
            radius: 1500,
          },
          function (data, status) {
            if (status === google.maps.StreetViewStatus.OK) {
              nearestLatLng = data?.location?.pano;
            } else {
              console.log(status);
            }
          }
        )
        .then(() => {
          panorama.setPano(nearestLatLng);
          panorama.setPov({           
            heading: 0,
            pitch: 0,
          });
          panorama.setVisible(true);
          panorama.setOptions(panoOptions);
          panorama.setZoom(0)
          setLoading(false);
        });
    });
  };
  // If the currentLocation prop changes; fetch a new country
  useEffect(() => {
    getNearestPanorama();
    window.addEventListener(
      'keydown',
      (event) => {
        if (
          (
            // Change or remove this condition depending on your requirements.
            event.key === 'ArrowUp' || // Move forward
            event.key === 'ArrowDown' || // Move forward
            event.key === 'ArrowLeft' || // Pan left
            event.key === 'ArrowRight' || // Pan right
            event.key === '+' || // Zoom in
            event.key === '=' || // Zoom in
            event.key === '_' || // Zoom out
            event.key === '-' // Zoom out
          ) &&
          !event.metaKey &&
          !event.altKey &&
          !event.ctrlKey
        ) {
          event.stopPropagation()
        };
      },
      { capture: true },
    );
  }, [currentLocation]);

  useEffect(() => {
    if (!loading) {
      mapElement.current.style.opacity = 1;
    }
  }, [loading]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      <div id="map" ref={mapElement} style={{ opacity: 0, transition: 'opacity 5.5s' }} />
    </div>
  );
};
export default Map;
