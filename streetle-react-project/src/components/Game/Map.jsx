import { Loader } from "@googlemaps/js-api-loader";
import React, { useRef, useEffect, useState } from "react";
import './Map.css'
import { RingLoader } from "react-spinners";

const loader = new Loader({
  apiKey: import.meta.env.VITE_STREET_VIEW_API_KEY,
  version: "weekly",
});

const Map = ({ currentLocation }) => {
  const ADJUSTMENT_AMOUNT = 0.04;
  const LOADER_DISPLAY_DURATION = 2000;

  let mapElement = useRef(null);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  let googleStreetViewService;
  let panorama;
  let nearestLatLng;
  let adjust;
  let panoOptions = {
    scrollwheel: true,
    clickToGo: false,
    disableDefaultUI: true
  };

  const getNearestPanorama = () => {
    setLoading(true);
    setShowLoader(true);

    loader.load().then((google) => {
      googleStreetViewService = new google.maps.StreetViewService();
      panorama = new google.maps.StreetViewPanorama(mapElement.current);
      adjust = Math.random() * ADJUSTMENT_AMOUNT;

      googleStreetViewService.getPanorama(
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
        panorama.setZoom(0);
        setLoading(false);
        setTimeout(() => {
          setShowLoader(false);
        }, LOADER_DISPLAY_DURATION);
      });
    });
  };

  useEffect(() => {
    getNearestPanorama();

    window.addEventListener(
      'keydown',
      (event) => {
        if (
          (event.key === 'ArrowUp' ||
            event.key === 'ArrowDown' ||
            event.key === 'ArrowLeft' ||
            event.key === 'ArrowRight' ||
            event.key === '+' ||
            event.key === '=' ||
            event.key === '_' ||
            event.key === '-') &&
          !event.metaKey &&
          !event.altKey &&
          !event.ctrlKey
        ) {
          event.stopPropagation()
        };
      },
      { capture: true }
    );
  }, [currentLocation]);

  useEffect(() => {
    if (!loading) {
      mapElement.current.style.opacity = 1;
    }
  }, [loading]);

  return (
    <div>
      {showLoader && ( 
        <div className="loader-container">
          <RingLoader color="#ffffff" />
        </div>
      )}
      <div id="map" ref={mapElement} style={{ opacity: 0, transition: 'opacity 5.5s' }} />
    </div>
  );
};

export default Map;