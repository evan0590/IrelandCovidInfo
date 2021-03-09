import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import LiveApiData from "./LiveApiData";
import GraphDialog from "../containers/GraphDialog";

// Latitude and longitude coordinates are: 52.668018, -8.630498.
const irelandCenter = require("../data/IrelandCenter.json");
// Importing custom styles to customize the style of Google Map...
// important for including and excluding certain place markers etc.
const mapNormalModeBasic = require("../data/MapNormalModeBasic");
const mapContainerStyle = {
  height: "93vh",
};

const countiesModule = require("../data/GEOJson");
const counties = countiesModule.default;

export default function Map(props) {
  // carried from Practicum
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API,
  });
  const center = irelandCenter;
  // eslint-disable-next-line
  const [mapOptions, setMapOptions] = useState({
    // gestureHandling: "none",
    styles: mapNormalModeBasic,
    disableDefaultUI: true,
    zoomControl: true,
    maxZoom: 18,
    minZoom: 8,
  });
  // eslint-disable-next-line
  const [zoom, setZoom] = useState(8); // removing unwanted warning.
  // The general things we need to track in state:
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [markerMap, setMarkerMap] = useState({});
  const [infoOpen, setInfoOpen] = useState(false);
  // eslint-disable-next-line
  const [geoMarkers, setGeoMarkers] = useState([]);
  // eslint-disable-next-line
  const [selected, setSelected] = useState(null); // removing unwanted warning.
  const [graphDialogOpen, setGraphDialogOpen] = useState(false);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const markerLoadHandler = (marker, county) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [county.properties.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which stop was clicked
    setSelectedPlace(place);
    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  };

  const handleGraphDialogOpen = () => {
    setGraphDialogOpen(true);
  };

  if (loadError) return "Error";
  if (!isLoaded)
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <p>... loading</p>
      </div>
    );
  return (
    <GoogleMap
      // Inbuilt props: https://react-google-maps-api-docs.netlify.app/#googlemap.
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      options={mapOptions}
      onLoad={onMapLoad}
    >
      {counties.map((county) => (
        <Marker
          icon={county.icon}
          key={county.properties.id}
          position={county.geometry.pos}
          onLoad={(marker) => {
            markerLoadHandler(marker, county);
          }}
          onClick={(event) => {
            markerClickHandler(event, county);
            props.setLat(county.geometry.pos.lat);
            props.setLng(county.geometry.pos.lng);
          }}
          animation={window.google.maps.Animation.DROP}
        />
      ))}
      {infoOpen && selectedPlace && (
        <InfoWindow
          // Inbuilt props: https://react-google-maps-api-docs.netlify.app/#infowindow.
          anchor={markerMap[selectedPlace.properties.id]}
          // onClick={() => {
          //   props.setLat(selectedPlace.geometry.pos.lat);
          //   props.setLng(selectedPlace.geometry.pos.lng);
          // }}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div
            style={{
              textAlign: "center",
              verticalAlign: "middle",
            }}
          >
            <h2>{selectedPlace.properties.id}</h2>
            <button
              onClick={() => {
                handleGraphDialogOpen();
              }}
            ></button>
            <GraphDialog
              graphDialogOpen={graphDialogOpen}
              setGraphDialogOpen={setGraphDialogOpen}
            ></GraphDialog>
            {/* {console.log(selectedPlace.properties.id)} */}
            {/* <StaticApiData></StaticApiData> */}
            <LiveApiData
              countyName={selectedPlace.properties.id}
              population={selectedPlace.properties.number}
            ></LiveApiData>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
