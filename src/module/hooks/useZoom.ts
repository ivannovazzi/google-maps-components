

import { useState } from "react";
import { MapCameraChangedEvent } from "../types";

export default function useZoom(zoom: number = 6): [number, (event: MapCameraChangedEvent) => void] {
  const [currentZoom, setZoom] = useState<number>(zoom);
  function handleZoomChanged(event: MapCameraChangedEvent) {
    setZoom(event.map.getZoom() as number);
  }
  return [currentZoom, handleZoomChanged];
}