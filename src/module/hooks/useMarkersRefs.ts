import { useRef } from "react";
import { MarkerMap, AdvancedMarkerElement } from "../types";

type SetMarkerItem = (marker: AdvancedMarkerElement | null, key: string) => void;

export default function useMarkerMap(): [MarkerMap, SetMarkerItem] {
  const markersMap = useRef<MarkerMap>({});

  function setMarkerRef(marker: AdvancedMarkerElement | null, key: string) {
    if (!markersMap.current) return;
    if (marker && markersMap.current[key]) return;
    if (!marker && !markersMap.current[key]) return;
    if (!marker) delete markersMap.current[key];
    else markersMap.current[key] = marker;
  };

  return [markersMap.current, setMarkerRef];
}