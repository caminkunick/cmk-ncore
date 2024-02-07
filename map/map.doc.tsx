import L from "leaflet";

// SECTION - Map
export namespace Map {
  // ANCHOR - Type
  export type Type = "marker" | "route" | "area";

  // SECTION - Marker
  export namespace Marker {
    // ANCHOR - Category Type
    export type CatType =
      | "airport"
      | "station"
      | "busstop"
      | "pier"
      | "travel"
      | "eating"
      | "cafe"
      | "shopping"
      | "show"
      | "activity"
      | "office"
      | "sleeping"
      | "hospital"
      | "school";

    // ANCHOR - Categories
    export type CategoryItem = {
      id: CatType;
      label: string;
      color: string;
      icon: string;
    };
    export const Categories: Map.Marker.CategoryItem[] = [
      {
        id: "airport",
        label: "สนามบิน",
        color: "#000000",
        icon: "plane",
      },
      {
        id: "station",
        label: "สถานีรถไฟ/ราง/กระเช้า",
        color: "#000000",
        icon: "train",
      },
      {
        id: "busstop",
        label: "ป้ายรถเมล์",
        color: "#000000",
        icon: "bus",
      },
      {
        id: "pier",
        label: "ท่าเรือ",
        color: "#000000",
        icon: "ship",
      },
      {
        id: "travel",
        label: "ที่เที่ยว",
        color: "#DD0000",
        icon: "camera",
      },
      {
        id: "eating",
        label: "ที่กิน",
        color: "#F0BF00",
        icon: "utensils",
      },
      {
        id: "cafe",
        label: "คาเฟ่",
        color: "#FF7BCB",
        icon: "mug-saucer",
      },
      {
        id: "shopping",
        label: "ที่ช้อป",
        color: "#0059B2",
        icon: "bag-shopping",
      },
      {
        id: "show",
        label: "ชม",
        color: "#007843",
        icon: "eye",
      },
      {
        id: "activity",
        label: "กิจกรรม",
        color: "#007843",
        icon: "child",
      },
      {
        id: "office",
        label: "สำนักงาน",
        color: "#FF7D29",
        icon: "briefcase",
      },
      {
        id: "sleeping",
        label: "ที่นอน",
        color: "#000000",
        icon: "bed",
      },
      {
        id: "hospital",
        label: "สถานพยาบาล",
        color: "#000000",
        icon: "hospital",
      },
      {
        id: "school",
        label: "สถานศึกษา",
        color: "#000000",
        icon: "school",
      },
    ];

    // ANCHOR - SVG Icon
    export const SVGIcon = (icon: Map.Marker.CategoryItem) => {
      return `<?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="36px" height="44px" viewBox="0 0 36 44" enable-background="new 0 0 36 44" xml:space="preserve">
    <svg>
      <path fill="${
        icon?.color || "#CC3100"
      }" d="M34.353,17.518c-0.022-1.583-0.267-3.113-0.72-4.555c-0.004-0.015-0.01-0.029-0.015-0.043
        c-0.139-0.436-0.302-0.859-0.476-1.278c-0.161-0.387-0.344-0.762-0.533-1.134c-0.044-0.085-0.081-0.174-0.126-0.259
        c-0.3-0.559-0.627-1.1-0.985-1.618c-0.225-0.321-0.464-0.629-0.709-0.933c-0.063-0.079-0.121-0.164-0.188-0.241
        c-1.528-1.818-3.461-3.284-5.652-4.3c-0.316-0.147-0.637-0.287-0.964-0.414c-0.019-0.007-0.035-0.013-0.054-0.019
        c-1.396-0.536-2.877-0.896-4.428-1.035C19.008,1.644,18.508,1.614,18,1.614c-0.619,0-1.227,0.041-1.826,0.105
        c-2.535,0.278-4.892,1.133-6.942,2.421C9.172,4.179,9.108,4.212,9.049,4.25c-0.09,0.058-0.183,0.112-0.271,0.172
        c-3.343,2.252-5.782,5.698-6.716,9.712c-0.085,0.367-0.151,0.74-0.211,1.115C1.83,15.39,1.805,15.53,1.786,15.672
        c-0.049,0.377-0.079,0.758-0.103,1.143c-0.012,0.217-0.029,0.434-0.033,0.653c-0.001,0.093-0.014,0.183-0.014,0.276
        c0,0.066,0.019,0.127,0.021,0.192c0.032,3.644,1.329,7.349,4.039,11.475c2.975,4.516,6.986,8.621,12.264,12.53
        c0.133-0.108,0.26-0.215,0.392-0.324c1.026-0.844,2.083-1.717,3.067-2.611c5.492-4.96,8.926-9.309,11.129-14.088
        c1.074-2.335,1.644-4.568,1.764-6.731c0.02-0.147,0.051-0.291,0.051-0.443C34.363,17.668,34.354,17.595,34.353,17.518z"/>
      <path fill="#FFFFFF" d="M18,1.613c0.508,0,1.01,0.03,1.506,0.075c1.551,0.139,3.031,0.499,4.426,1.035
        c0.02,0.006,0.035,0.012,0.055,0.019c0.327,0.127,0.646,0.267,0.964,0.414c2.19,1.017,4.124,2.482,5.652,4.3
        c0.065,0.078,0.124,0.162,0.188,0.241C31.035,8,31.274,8.309,31.498,8.63c0.359,0.518,0.688,1.06,0.986,1.618
        c0.045,0.085,0.082,0.174,0.126,0.259c0.19,0.372,0.372,0.747,0.533,1.134c0.174,0.418,0.337,0.842,0.476,1.278
        c0.004,0.015,0.01,0.029,0.014,0.043c0.455,1.441,0.697,2.972,0.721,4.555c0.001,0.077,0.012,0.15,0.012,0.227
        c0,0.152-0.031,0.296-0.051,0.443c-0.12,2.163-0.688,4.396-1.764,6.731c-2.203,4.779-5.637,9.128-11.129,14.088
        c-0.984,0.895-2.041,1.768-3.067,2.611c-0.132,0.109-0.259,0.216-0.392,0.324c-5.276-3.909-9.289-8.016-12.264-12.53
        c-2.71-4.126-4.007-7.831-4.039-11.475c-0.004-0.065-0.021-0.126-0.021-0.192c0-0.093,0.013-0.184,0.014-0.276
        c0.004-0.22,0.021-0.436,0.034-0.653c0.022-0.385,0.053-0.766,0.103-1.143c0.018-0.143,0.043-0.282,0.064-0.423
        c0.061-0.375,0.126-0.748,0.211-1.115C2.998,10.12,5.438,6.675,8.78,4.422c0.089-0.06,0.183-0.114,0.271-0.172
        c0.06-0.039,0.123-0.072,0.183-0.109c2.052-1.288,4.407-2.143,6.942-2.421C16.775,1.654,17.383,1.613,18,1.613 M18,0
        c-0.636,0-1.291,0.038-2.006,0.116c-2.73,0.299-5.303,1.195-7.642,2.663C8.258,2.835,8.2,2.869,8.146,2.905L8.071,2.951
        c-0.073,0.046-0.147,0.092-0.22,0.141c-3.746,2.525-6.37,6.319-7.385,10.682C0.385,14.131,0.313,14.509,0.234,15l-0.023,0.148
        c-0.017,0.108-0.033,0.215-0.047,0.324c-0.05,0.374-0.084,0.773-0.113,1.251l-0.008,0.154c-0.015,0.186-0.023,0.373-0.029,0.561
        C0.006,17.572,0,17.658,0,17.746c0,0.105,0.01,0.206,0.023,0.306c0.059,3.917,1.466,7.921,4.302,12.238
        c3.086,4.688,7.226,8.922,12.652,12.944L18.012,44l0.996-0.816l0.326-0.271l0.075-0.063c1.122-0.922,2.14-1.764,3.121-2.656
        c5.657-5.11,9.208-9.616,11.509-14.605c1.121-2.438,1.762-4.873,1.903-7.241l0.008-0.049c0.021-0.137,0.05-0.323,0.05-0.552
        c0-0.08-0.004-0.158-0.011-0.237c-0.024-1.742-0.293-3.428-0.795-5.023c-0.151-0.48-0.317-0.926-0.537-1.453
        c-0.155-0.376-0.343-0.774-0.588-1.251l-0.03-0.068c-0.033-0.069-0.066-0.139-0.103-0.207c-0.345-0.642-0.709-1.239-1.091-1.788
        c-0.223-0.32-0.469-0.646-0.776-1.026l-0.05-0.064c-0.051-0.067-0.102-0.134-0.155-0.198c-1.669-1.985-3.817-3.621-6.219-4.734
        c-0.377-0.175-0.724-0.324-1.062-0.455l-0.029-0.011l-0.07-0.026c-1.539-0.591-3.18-0.975-4.831-1.123C19.033,0.026,18.508,0,18,0
        L18,0z"/>
    </svg></svg>`;
    };

    // ANCHOR - Icon
    export const Icon = (type: string): L.Icon | undefined => {
      const IconMap = Map.Marker.Categories.find((icon) => icon.id === type);
      if (IconMap) {
        const iconUrl = `data:image/svg+xml;charset=UTF-8;base64,${window.btoa(
          Map.Marker.SVGIcon(IconMap)
        )}`;
        return new L.Icon({
          iconUrl,
          iconRetinaUrl: iconUrl,
          iconSize: new L.Point(40, 40),
          iconAnchor: new L.Point(20, 20),
          popupAnchor: new L.Point(0, -40),
        });
      }
      return undefined;
    };
  }
  // !SECTION

  // ANCHOR - LatLng
  export type LatLng = { lat: number; lng: number };

  // ANCHOR - Visibility
  export type Visibility = "public" | "private" | "protected";

  // SECTION - Document
  export class Document {
    id: string = "";
    title: string = "";
    type: Map.Type = "marker";
    address: Record<string, string> = {};
    latLng: Map.LatLng = { lat: 0, lng: 0 };
    latLngs: Map.LatLng[] = [];
    visibility: Visibility = "private";
    color: string = "#000000";
    user: string = "";
    maps: string[] = [];
    datecreate: number = 0;
    datemodified: number = 0;
    cat: string = "travel";

    constructor(init?: Partial<Document>) {
      Object.assign(this, init);
    }
  }
  // !SECTION

  // ANCHOR - Query Bounds
  export const queryBounds = (maps: Map.Document[]): Map.LatLng[] => {
    const latLngs = maps.reduce(
      (l, map) => l.concat(map.type === "marker" ? map.latLng : map.latLngs),
      [] as Record<"lat" | "lng", number>[]
    );
    if (latLngs.length > 1) {
      const bounds = new L.LatLngBounds([]);
      latLngs.map((latLng) => bounds.extend(latLng));
      return [bounds.getNorthEast(), bounds.getSouthWest()];
    } else if (latLngs.length > 0) {
      return latLngs;
    } else {
      return [];
    }
  };
}
// !SECTION
