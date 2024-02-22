"use client";

import clsx from "clsx";
import styles from "./map.module.css";
import React, { ComponentType, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { MapTool as M } from "./map.tool";
import { useMap } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const MapPopup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const Polygon = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polygon),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export * from "./map.tool";
export * from "./marker.cat";

const mapConnect = <T extends {}>(Comp: ComponentType<T>) =>
  React.memo((props: T) => {
    return (
      <MapContainer center={M.center} zoom={13} {...props}>
        <Comp {...props} />
      </MapContainer>
    );
  });

export type MapProps = {
  docs: M.Document[];
  editor?: M.Document | null;
  onChange?: (doc: M.Document) => void;
  onLoad?: (map: L.Map) => void;
};
export const Map = mapConnect<MapProps>((props: MapProps) => {
  const map = useMap();
  const [leaflet, setLeaflet] = useState<any | null>(null);

  useEffect(() => {
    props.onLoad?.(map);
  }, [map]);

  useEffect(() => {
    import("leaflet").then((mod) => setLeaflet(mod.default));
  }, []);

  return (
    <div className={clsx(styles.map)}>
      <TileLayer {...M.TilePropsOpen} />
      {props.editor &&
        ((doc) => {
          switch (doc.type) {
            case "marker":
              return (
                <Marker
                  key={doc._id}
                  position={doc.latLng}
                  icon={leaflet ? M.Marker.Icon(leaflet, doc.cat) : undefined}
                  draggable
                  eventHandlers={{
                    dragend: (e) =>
                      props.onChange?.(doc.Set("latLng", e.target.getLatLng())),
                  }}
                />
              );
            case "route":
              return (
                <>
                  {doc
                    .LatLng()
                    .decode()
                    .map((latLng, i, latlngs) =>
                      i > 0 ? (
                        <Polyline
                          key={`${doc._id}-${i}-${doc.color}`}
                          positions={[latlngs[i - 1], latLng]}
                          color={doc.color}
                          eventHandlers={{
                            dblclick: () => {},
                          }}
                        />
                      ) : null
                    )}
                  {doc
                    .LatLng()
                    .decode()
                    .map((latLng, i) => (
                      <Marker
                        key={`${doc._id}-${i}-${JSON.stringify(latLng)}`}
                        position={latLng}
                        icon={
                          leaflet ? M.Route.Icon(leaflet, doc.color) : undefined
                        }
                        draggable
                        eventHandlers={{
                          dragend: (ev) => {
                            props.onChange?.(
                              doc.LatLng().indexChange(i, ev.target.getLatLng())
                            );
                          },
                        }}
                      />
                    ))}
                </>
              );
            default:
              if (process.env.NODE_ENV === "development") {
                console.log(doc);
              }
              return null;
          }
        })(props.editor)}
      {props.docs.map((doc) => {
        switch (doc.type) {
          case "marker":
            return (
              <Marker
                key={doc._id}
                position={doc.latLng}
                icon={leaflet ? M.Marker.Icon(leaflet, doc.cat) : undefined}
              >
                <MapPopup>
                  <div>{doc.title}</div>
                </MapPopup>
              </Marker>
            );
          case "route":
            return (
              <Polyline
                key={`${doc._id}-${map.getZoom()}`}
                positions={doc.LatLng().decode()}
                color={doc.color}
              >
                <MapPopup>
                  <div>{doc.title}</div>
                </MapPopup>
              </Polyline>
            );
          default:
            if (process.env.NODE_ENV === "development") {
              console.log(doc);
            }
            return null;
        }
      })}
    </div>
  );
});

export default Map;
