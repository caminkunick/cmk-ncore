"use client";

import {
  ComponentType,
  Fragment,
  HTMLAttributes,
  useEffect,
  useReducer,
} from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import styles from "./map.module.css";
import clsx from "clsx";
import "./index.css";
import { LeafletMouseEvent } from "leaflet";
import { Map as M } from "./map.doc";
import { PopupWithLatLng } from "./popup";

class State {
  anchor: null | Element = null;
  lyrs: "h" | "m" | "p" | "r" | "s" | "t" | "y" = "m";

  constructor(data?: Partial<State>) {
    Object.assign(this, data);
  }

  set<T extends keyof this>(field: T, value: this[T]): State {
    return new State({ ...this, [field]: value });
  }

  static lyrsList: { value: State["lyrs"]; label: string }[] = [
    { value: "h", label: "Roads only" },
    { value: "m", label: "Standard Roadmap" },
    { value: "p", label: "Terrain" },
    { value: "r", label: "Somehow Altered Roadmap" },
    { value: "s", label: "Satellite Only" },
    { value: "t", label: "Terrain Only" },
    { value: "y", label: "Hybrid" },
  ];

  static reducer(
    state: State,
    action:
      | { type: "lyrs"; value: string }
      | { type: "anchor"; value: State["anchor"] }
  ) {
    switch (action.type) {
      case "anchor":
        return state.set("anchor", action.value);
      case "lyrs":
        return state.set("lyrs", action.value as State["lyrs"]);
      default:
        return state;
    }
  }
}

// import { Box, BoxProps, Menu, MenuItem, styled } from "@mui/material";
// import L from "leaflet";
// import { ComponentType, useReducer } from "react";
// import { Fragment, useEffect } from "react";
// import {
//   MapContainer,
//   Marker,
//   TileLayer,
//   MapContainerProps,
//   useMap,
//   Polyline,
//   Polygon,
// } from "react-leaflet";
// import { ActionIcon } from "..";

// export type LeafletMapProps = {
//   onMapClick?: (event: L.LeafletMouseEvent) => void;
//   maps?: M.Document[];
//   children?: React.ReactNode;
// };
// export const LeafletMap = ({ onMapClick, ...props }: LeafletMapProps) => {
//   const [state, dispatch] = useReducer(
//     LeafletState.reducer,
//     new LeafletState()
//   );
//   const map = useMap();

//   useEffect(() => {
//     const latLngs = M.queryBounds(props.maps ?? []);
//     if (latLngs.length > 1) {
//       const bounds = new L.LatLngBounds([]);
//       latLngs.forEach((latLng) => bounds.extend(latLng));
//       map.fitBounds(bounds, { padding: [24, 24] });
//     } else if (latLngs.length > 0) {
//       setTimeout(() => {
//         if (latLngs[0]) {
//           map.setView(latLngs[0], 16);
//         }
//       }, 500);
//     }

//     map.addEventListener("click", (e) => onMapClick?.(e));
//     return () => {
//       map.removeEventListener("click");
//     };
//   }, [map, onMapClick, props.maps]);

//   return (
//     <Fragment>
//       <TileLayer
//         attribution='&copy; <a href="https://www.google.com/help/terms_maps/" target="_blank">Google Maps</a>'
//         // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Google Maps</a> contributors'
//         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         url={`http://{s}.google.com/vt/lyrs=${state.lyrs}&x={x}&y={y}&z={z}`}
//         subdomains={["mt0", "mt1", "mt2", "mt3"]}
//         key={`tile-${state.lyrs}`}
//       />
//       {props.maps?.map((item) => {
//         switch (item.type) {
//           case "route":
//             return (
//               <Polyline
//                 positions={item.latLngs!}
//                 color={item.color}
//                 key={item.id}
//               >
//                 <PopupWithLatLng title={item.title} />
//               </Polyline>
//             );
//           case "area":
//             return (
//               <Polygon
//                 positions={item.latLngs!}
//                 color={item.color}
//                 fillOpacity={0.5}
//                 key={item.id}
//               >
//                 <PopupWithLatLng title={item.title} />
//               </Polygon>
//             );
//           case "marker":
//             return (
//               <Marker
//                 position={item.latLng!}
//                 icon={Icon(item.cat as M.Marker.CatType)}
//                 key={item.id}
//               >
//                 <PopupWithLatLng title={item.title} latLng={item.latLng} />
//               </Marker>
//             );
//           default:
//             return null;
//         }
//       })}
//       {props.children}
//       <Box
//         sx={{
//           height: 48,
//           position: "absolute",
//           top: 8,
//           right: 8,
//           zIndex: 401,
//         }}
//       >
//         <ActionIcon
//           icon="ellipsis-v"
//           color="primary"
//           onClick={({ currentTarget }) =>
//             dispatch({ type: "anchor", value: currentTarget })
//           }
//           sx={{
//             backgroundColor: "#FFF8",
//             color: "#333",
//             "&:hover": { backgroundColor: "#FFFB" },
//           }}
//         />
//         <Menu
//           open={Boolean(state.anchor)}
//           anchorEl={state.anchor}
//           onClose={() => dispatch({ type: "anchor", value: null })}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//         >
//           {LeafletState.lyrsList.map((item) => (
//             <MenuItem
//               value={item.value}
//               key={item.value}
//               selected={state.lyrs === item.value}
//               onClick={() => dispatch({ type: "lyrs", value: item.value })}
//             >
//               {item.label}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>
//     </Fragment>
//   );
// };

const MapWrap =
  <T extends {}>(Comp: ComponentType<T>) =>
  (props: T) => {
    return (
      <div {...props} className={clsx(styles.map)}>
        <MapContainer
          className={styles.container}
          center={{ lat: 13.74574175868472, lng: 100.50150775714611 }}
          zoom={13}
        >
          <Comp {...props} />
        </MapContainer>
      </div>
    );
  };

export type MapProps = HTMLAttributes<HTMLDivElement> & {
  maps?: M.Document[];
  onClick?: (e: LeafletMouseEvent) => void;
};
export const Map = MapWrap(({ onClick, ...props }: MapProps) => {
  const [state, dispatch] = useReducer(State.reducer, new State());
  const map = useMap();

  useEffect(() => {
    map.addEventListener("click", (e) => onClick?.(e));
    return () => {
      map.removeEventListener("click", (e) => onClick?.(e));
    };
  }, [map, onClick]);

  return (
    <Fragment>
      <TileLayer
        attribution='&copy; <a href="https://www.google.com/help/terms_maps/" target="_blank">Google Maps</a>'
        url={`http://{s}.google.com/vt/lyrs=${state.lyrs}&x={x}&y={y}&z={z}`}
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        key={`tile-${state.lyrs}`}
      />
      {(props.maps ?? []).map((item) => {
        switch (item.type) {
          case "marker":
            return (
              <Marker
                position={item.latLng}
                icon={M.Marker.Icon(item.cat)}
                key={item.id}
              >
                <PopupWithLatLng title={item.title} latLng={item.latLng} />
              </Marker>
            );
          default:
            return null;
        }
      })}
    </Fragment>
  );
});
