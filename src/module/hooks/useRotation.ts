import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Clusterable } from "../types";
import usePrevious from "./usePrevious";

type BearingFn = (from: google.maps.LatLng, to: google.maps.LatLng) => number;

function bearing(lat1: number, lng1: number, lat2: number, lng2: number, bearingFn: BearingFn) {
  const from = new google.maps.LatLng(lat1, lng1);
  const to = new google.maps.LatLng(lat2, lng2);
  return bearingFn(from, to);
}

export default function useRotation<T extends Clusterable>(data: T[]): T[] {
  const geometriesLib = useMapsLibrary('geometry');
  const [rotated, setRotated] = useState<T[]>(data);
  const previous = usePrevious<T[]>(rotated);  
  
  useEffect(() => {
    const bearingFn = geometriesLib?.spherical?.computeHeading;
    if (!bearingFn) {
      return;
    }
    
    const items = data.map((dataItem) => {
      const { lat, lng } = dataItem._pos;
      const prevItem = previous.find((p) => p._key === dataItem._key);
      if (!prevItem) {
        return dataItem;
      }
      if (prevItem._pos === dataItem._pos) {
        return prevItem;
      }
      return {
        ...dataItem,
        _rotation: bearing(lat, lng, prevItem._pos.lat, prevItem._pos.lng, bearingFn),
      };
    });
    setRotated(items);
    
    
   }, [data, previous, geometriesLib]);

   return rotated;
}
