import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

export default function TrafficLayer() {
  const map = useMap();
  const layerRef = useRef<google.maps.TrafficLayer>();
  const mapsLibrary = useMapsLibrary("maps");
  // Initialize layer service and renderer
  useEffect(() => {
    if (!mapsLibrary || !map) return;
    const layer = new mapsLibrary.TrafficLayer();
    layerRef.current = layer;
    layerRef.current.setMap(map);

    return () => {
      if (!map || !layerRef.current) return;
      layerRef.current.setMap(null);
    }
  }, [mapsLibrary, map]);
  return null;
}