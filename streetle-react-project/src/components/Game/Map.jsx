import { Loader } from "@googlemaps/js-api-loader";
import React, { useRef, useEffect } from "react";
import './Map.css'

const loader = new Loader({
  apiKey: import.meta.env.VITE_STREET_VIEW_API_KEY,
  version: "weekly",
});

const Map = ({ currentLocation }) => {
  const ADJUSTMENT_AMOUNT = 0.09
  let mapElement = useRef(null);
  let googleStreetViewService;
  let panorama;
  // Value for panoramas nearest lat and lang based and given coords
  let nearestLatLng;
  // Value for random adjustment of given coords 
  let adjust;
  let panoOptions = {
    scrollwheel: true,
    disableDefaultUI: true,
    clickToGo: false
  };

  // Fetch a new panorama
  const getNearestPanorama = () => {
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
            heading: 165,
            pitch: 0,
          });
          panorama.setVisible(true);
          panorama.setOptions(panoOptions);
        });
    });
  };
  // If the currentLocation prop changes; fetch a new country
  useEffect(() => {
    getNearestPanorama();
  }, [currentLocation]);

  return <div 
    id="map" 
    ref={mapElement}
  />;
};
export default Map;
