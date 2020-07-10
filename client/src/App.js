import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import "./index.css";

import { listAllLogs } from "./API";
import LogEntryForm from "./LogEntryForm";

function App() {
  const [logEntries, setLongEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 33.8423604,
    longitude: 9.7989003,
    zoom: 5,
  });
  const getlogs = async () => {
    const logEntry = await listAllLogs();
    setLongEntries(logEntry);
  };
  useEffect(() => {
    getlogs();
  }, []);

  const showAddMarker = (event) => {
    console.log(event);
    const [longitude, latitude] = event.lngLat;
    console.log(latitude);
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/zmola007/ckcf13ph01gq71inogn8jkhdt"
      mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      onDblClick={showAddMarker}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longtitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <div
              onClick={() =>
                setShowPopup({
                  [entry._id]: true,
                })
              }
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="red"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longtitude}
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={() => setShowPopup({ [entry._id]: false })}
              anchor="top"
            >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on: {new Date(entry.visitedAt).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            offsetLeft={-12}
            offsetTop={-24}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="yellow"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </Marker>
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition={true}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
          >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getlogs();
                }}
                location={addEntryLocation}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
}

export default App;
