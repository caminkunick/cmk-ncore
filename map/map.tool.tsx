// 'use client';

import L from "leaflet";
import { DefaultType } from "../ctrls/default";

// SECTION - Map
export namespace MapTool {
  // ANCHOR - center
  export const center = { lat: 13.74574, lng: 100.5015 };

  // ANCHOR - TileProps
  export const TileProps = {
    url: "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
    attribution: `&copy; <a href="https://www.google.com/help/terms_maps/" target="_blank">Google Maps</a>`,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  };
  export const TilePropsOpen = {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };

  // ANCHOR - GenId
  export const genId = (): string => {
    return Math.random().toString(36).substring(2, 9);
  };

  // ANCHOR - Type
  export type Type = "marker" | "route" | "area" | "pack";

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
      viewbox: string;
    };
    export const Categories: MapTool.Marker.CategoryItem[] = [
      {
        id: "airport",
        label: "สนามบิน",
        color: "#000000",
        icon: "M482.3 192c34.2 0 93.7 29 93.7 64c0 36-59.5 64-93.7 64l-116.6 0L265.2 495.9c-5.7 10-16.3 16.1-27.8 16.1l-56.2 0c-10.6 0-18.3-10.2-15.4-20.4l49-171.6L112 320 68.8 377.6c-3 4-7.8 6.4-12.8 6.4l-42 0c-7.8 0-14-6.3-14-14c0-1.3 .2-2.6 .5-3.9L32 256 .5 145.9c-.4-1.3-.5-2.6-.5-3.9c0-7.8 6.3-14 14-14l42 0c5 0 9.8 2.4 12.8 6.4L112 192l102.9 0-49-171.6C162.9 10.2 170.6 0 181.2 0l56.2 0c11.5 0 22.1 6.2 27.8 16.1L365.7 192l116.6 0z",
        viewbox: "0 0 576 512",
      },
      {
        id: "station",
        label: "สถานีรถไฟ/ราง/กระเช้า",
        color: "#000000",
        icon: "M96 0C43 0 0 43 0 96V352c0 48 35.2 87.7 81.1 94.9l-46 46C28.1 499.9 33.1 512 43 512H82.7c8.5 0 16.6-3.4 22.6-9.4L160 448H288l54.6 54.6c6 6 14.1 9.4 22.6 9.4H405c10 0 15-12.1 7.9-19.1l-46-46c46-7.1 81.1-46.9 81.1-94.9V96c0-53-43-96-96-96H96zM64 96c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V96zM224 288a48 48 0 1 1 0 96 48 48 0 1 1 0-96z",
        viewbox: "0 0 448 512",
      },
      {
        id: "busstop",
        label: "ป้ายรถเมล์",
        color: "#000000",
        icon: "M288 0C422.4 0 512 35.2 512 80V96l0 32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H192v32c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h0V96h0V80C64 35.2 153.6 0 288 0zM128 160v96c0 17.7 14.3 32 32 32H272V128H160c-17.7 0-32 14.3-32 32zM304 288H416c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H304V288zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16s7.2 16 16 16H368c8.8 0 16-7.2 16-16z",
        viewbox: "0 0 576 512",
      },
      {
        id: "pier",
        label: "ท่าเรือ",
        color: "#000000",
        icon: "M192 32c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32V64h48c26.5 0 48 21.5 48 48V240l44.4 14.8c23.1 7.7 29.5 37.5 11.5 53.9l-101 92.6c-16.2 9.4-34.7 15.1-50.9 15.1c-19.6 0-40.8-7.7-59.2-20.3c-22.1-15.5-51.6-15.5-73.7 0c-17.1 11.8-38 20.3-59.2 20.3c-16.2 0-34.7-5.7-50.9-15.1l-101-92.6c-18-16.5-11.6-46.2 11.5-53.9L96 240V112c0-26.5 21.5-48 48-48h48V32zM160 218.7l107.8-35.9c13.1-4.4 27.3-4.4 40.5 0L416 218.7V128H160v90.7zM306.5 421.9C329 437.4 356.5 448 384 448c26.9 0 55.4-10.8 77.4-26.1l0 0c11.9-8.5 28.1-7.8 39.2 1.7c14.4 11.9 32.5 21 50.6 25.2c17.2 4 27.9 21.2 23.9 38.4s-21.2 27.9-38.4 23.9c-24.5-5.7-44.9-16.5-58.2-25C449.5 501.7 417 512 384 512c-31.9 0-60.6-9.9-80.4-18.9c-5.8-2.7-11.1-5.3-15.6-7.7c-4.5 2.4-9.7 5.1-15.6 7.7c-19.8 9-48.5 18.9-80.4 18.9c-33 0-65.5-10.3-94.5-25.8c-13.4 8.4-33.7 19.3-58.2 25c-17.2 4-34.4-6.7-38.4-23.9s6.7-34.4 23.9-38.4c18.1-4.2 36.2-13.3 50.6-25.2c11.1-9.4 27.3-10.1 39.2-1.7l0 0C136.7 437.2 165.1 448 192 448c27.5 0 55-10.6 77.5-26.1c11.1-7.9 25.9-7.9 37 0z",
        viewbox: "0 0 576 512",
      },
      {
        id: "travel",
        label: "ที่เที่ยว",
        color: "#DD0000",
        icon: "M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z",
        viewbox: "0 0 512 512",
      },
      {
        id: "eating",
        label: "ที่กิน",
        color: "#F0BF00",
        icon: "M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z",
        viewbox: "0 0 448 512",
      },
      {
        id: "cafe",
        label: "คาเฟ่",
        color: "#FF7BCB",
        icon: "M96 64c0-17.7 14.3-32 32-32H448h64c70.7 0 128 57.3 128 128s-57.3 128-128 128H480c0 53-43 96-96 96H192c-53 0-96-43-96-96V64zM480 224h32c35.3 0 64-28.7 64-64s-28.7-64-64-64H480V224zM32 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32z",
        viewbox: "0 0 640 512",
      },
      {
        id: "shopping",
        label: "ที่ช้อป",
        color: "#0059B2",
        icon: "M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z",
        viewbox: "0 0 448 512",
      },
      {
        id: "show",
        label: "ชม",
        color: "#007843",
        icon: "M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z",
        viewbox: "0 0 576 512",
      },
      {
        id: "activity",
        label: "กิจกรรม",
        color: "#007843",
        icon: "M256 64A64 64 0 1 0 128 64a64 64 0 1 0 128 0zM152.9 169.3c-23.7-8.4-44.5-24.3-58.8-45.8L74.6 94.2C64.8 79.5 45 75.6 30.2 85.4s-18.7 29.7-8.9 44.4L40.9 159c18.1 27.1 42.8 48.4 71.1 62.4V480c0 17.7 14.3 32 32 32s32-14.3 32-32V384h32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V221.6c29.1-14.2 54.4-36.2 72.7-64.2l18.2-27.9c9.6-14.8 5.4-34.6-9.4-44.3s-34.6-5.5-44.3 9.4L291 122.4c-21.8 33.4-58.9 53.6-98.8 53.6c-12.6 0-24.9-2-36.6-5.8c-.9-.3-1.8-.7-2.7-.9z",
        viewbox: "0 0 384 512",
      },
      {
        id: "office",
        label: "สำนักงาน",
        color: "#FF7D29",
        icon: "M184 48H328c4.4 0 8 3.6 8 8V96H176V56c0-4.4 3.6-8 8-8zm-56 8V96H64C28.7 96 0 124.7 0 160v96H192 320 512V160c0-35.3-28.7-64-64-64H384V56c0-30.9-25.1-56-56-56H184c-30.9 0-56 25.1-56 56zM512 288H320v32c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32V288H0V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V288z",
        viewbox: "0 0 512 512",
      },
      {
        id: "sleeping",
        label: "ที่นอน",
        color: "#000000",
        icon: "M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z",
        viewbox: "0 0 640 512",
      },
      {
        id: "hospital",
        label: "สถานพยาบาล",
        color: "#000000",
        icon: "M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z",
        viewbox: "0 0 640 512",
      },
      {
        id: "school",
        label: "สถานศึกษา",
        color: "#000000",
        icon: "M337.8 5.4C327-1.8 313-1.8 302.2 5.4L166.3 96H48C21.5 96 0 117.5 0 144V464c0 26.5 21.5 48 48 48H256V416c0-35.3 28.7-64 64-64s64 28.7 64 64v96H592c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48H473.7L337.8 5.4zM96 192h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V208c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V208zM96 320h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16V336c0-8.8 7.2-16 16-16zm400 16c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v64c0 8.8-7.2 16-16 16H512c-8.8 0-16-7.2-16-16V336zM232 176a88 88 0 1 1 176 0 88 88 0 1 1 -176 0zm88-48c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H336V144c0-8.8-7.2-16-16-16z",
        viewbox: "0 0 640 512",
      },
    ];

    // ANCHOR - SVG Icon
    export const SVGIcon = (icon: MapTool.Marker.CategoryItem) => {
      const labelIcon =
        icon.icon.length > 20
          ? `<svg x="9px" y="8px" width="18px" height="18px" viewBox="${icon.viewbox}">
              <g transform="translateX(-50%)">
                <path fill="#FFFFFF" d="${icon.icon}"/>
              </g>
            </svg>`
          : "";
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
      </svg>${labelIcon}</svg>`;
    };

    // ANCHOR - Icon
    export const Icon = (
      Leaflet: typeof L,
      type: string
    ): L.Icon | undefined => {
      const IconMap = MapTool.Marker.Categories.find(
        (icon) => icon.id === type
      );
      if (IconMap) {
        const iconUrl = `data:image/svg+xml;charset=UTF-8;base64,${Buffer.from(
          MapTool.Marker.SVGIcon(IconMap)
        ).toString("base64")}`;
        return new Leaflet.Icon({
          iconUrl,
          iconRetinaUrl: iconUrl,
          iconSize: new Leaflet.Point(40, 60),
          iconAnchor: new Leaflet.Point(20, 60),
          popupAnchor: new Leaflet.Point(0, -60),
        });
      }
      return undefined;
    };
  }
  // !SECTION

  // SECTION - Route
  export namespace Route {
    const iconSvg = (color: string): string =>
      Buffer.from(
        `<?xml version="1.0" encoding="utf-8"?>
    <!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">
    <g>
      <path opacity="0.5" fill="${
        color || "#FF960B"
      }" enable-background="new    " d="M12,0C5.373,0,0,5.373,0,12c0,6.627,5.373,12,12,12
        c6.627,0,12-5.373,12-12C24,5.373,18.627,0,12,0z M12,18.961c-3.838,0-6.961-3.124-6.961-6.961S8.162,5.04,12,5.04
        s6.961,3.122,6.961,6.96S15.838,18.961,12,18.961z"/>
      <circle fill="${color || "#FF960B"}" cx="12" cy="12" r="4.96"/>
      <path fill="#FFFFFF" d="M12,5.04c-3.838,0-6.961,3.123-6.961,6.96S8.162,18.961,12,18.961s6.961-3.123,6.961-6.961
        S15.838,5.04,12,5.04z M12,16.961c-2.74,0-4.961-2.222-4.961-4.961c0-2.74,2.221-4.96,4.961-4.96c2.74,0,4.961,2.221,4.961,4.96
        S14.74,16.961,12,16.961z"/>
    </g>
    </svg>`
      ).toString("base64");

    export const Icon = (
      Leaflet: typeof L,
      color: string
    ): L.Icon | undefined => {
      const iconUrl = `data:image/svg+xml;charset=UTF-8;base64,${iconSvg(
        color
      )}`;
      return new Leaflet.Icon({
        iconUrl,
        iconRetinaUrl: iconUrl,
        iconSize: new Leaflet.Point(30, 30),
        iconAnchor: new Leaflet.Point(15, 15),
      });
    };
  }
  // !SECTION

  // ANCHOR - LatLng
  export type LatLng = { lat: number; lng: number };

  // SECTION - Document
  export class Document {
    _id: string = "";
    title: string = "";
    type: MapTool.Type = "marker";
    address: Record<string, string> = {};
    latLng: MapTool.LatLng = { lat: 0, lng: 0 };
    latLngs: string = "";
    visibility: DefaultType.VisibilityValue = "private";
    color: string = "#000000";
    user: string = "";
    maps: string[] = [];
    datecreate: number = 0;
    datemodified: number = 0;
    cat: string = "travel";
    draggable: boolean = false;

    constructor(init?: Partial<Document>) {
      Object.assign(this, init);
    }

    Set<T extends keyof this>(field: T, value: this[T]): MapTool.Document {
      if (this[field] instanceof Function === false) {
        return new MapTool.Document({ ...this, [field]: value });
      }
      return this;
    }

    LatLng() {
      return {
        change: (value: MapTool.LatLng): MapTool.Document => {
          return new MapTool.Document({ ...this, latLng: value });
        },
        lat: (value: number): MapTool.Document => {
          return new MapTool.Document({
            ...this,
            latLng: { ...this.latLng, lat: value },
          });
        },
        lng: (value: number): MapTool.Document => {
          return new MapTool.Document({
            ...this,
            latLng: { ...this.latLng, lng: value },
          });
        },
        decode: (): MapTool.LatLng[] => {
          if (this.latLngs) {
            const encoded = this.latLngs;
            const precision = Math.pow(10, -5);
            const dec = Math.pow(10, 6);
            var len = encoded.length,
              index = 0,
              lat = 0,
              lng = 0,
              array: MapTool.LatLng[] = [];
            while (index < len) {
              var b,
                shift = 0,
                result = 0;
              do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
              } while (b >= 0x20);
              var dlat = result & 1 ? ~(result >> 1) : result >> 1;
              lat += dlat;
              shift = 0;
              result = 0;
              do {
                b = encoded.charCodeAt(index++) - 63;
                result |= (b & 0x1f) << shift;
                shift += 5;
              } while (b >= 0x20);
              var dlng = result & 1 ? ~(result >> 1) : result >> 1;
              lng += dlng;
              array.push({
                lat: Math.floor(lat * precision * dec) / dec,
                lng: Math.floor(lng * precision * dec) / dec,
              });
            }
            return array;
          }
          return [];
        },
        encode: (points: MapTool.LatLng[]): string => {
          var oldLat = 0,
            oldLng = 0,
            len = points.length,
            index = 0;
          var encoded = "";
          const precision = Math.pow(10, 5);
          while (index < len) {
            //  Round to N decimal places
            var lat = Math.round(points[index].lat * precision);
            var lng = Math.round(points[index].lng * precision);

            //  Encode the differences between the points
            encoded += this.LatLng().encodeNumber(lat - oldLat);
            encoded += this.LatLng().encodeNumber(lng - oldLng);

            oldLat = lat;
            oldLng = lng;

            index++;
          }
          return encoded;
        },
        encodeNumber: (num: number) => {
          var num = num << 1;
          if (num < 0) {
            num = ~num;
          }
          var encoded = "";
          while (num >= 0x20) {
            encoded += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
            num >>= 5;
          }
          encoded += String.fromCharCode(num + 63);
          return encoded;
        },
        push: (value: MapTool.LatLng): MapTool.Document => {
          let latlngs = this.LatLng().decode().concat(value);
          return new MapTool.Document({
            ...this,
            latLngs: this.LatLng().encode(latlngs),
          });
        },
        indexChange: (
          index: number,
          value: MapTool.LatLng
        ): MapTool.Document => {
          const latlngs = this.LatLng().decode();
          latlngs[index] = value;
          return new MapTool.Document({
            ...this,
            latLngs: this.LatLng().encode(latlngs),
          });
        },
      };
    }
  }
  // !SECTION

  // ANCHOR - Query Bounds
  export const queryBounds = (maps: MapTool.Document[]): MapTool.LatLng[] => {
    const latLngs = maps.reduce(
      (l, map) =>
        l.concat(map.type === "marker" ? map.latLng : map.LatLng().decode()),
      [] as Record<"lat" | "lng", number>[]
    );
    return latLngs;
  };
}
// !SECTION

export default MapTool;
