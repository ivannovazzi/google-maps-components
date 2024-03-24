import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

interface DirectionsRendererProps {
  directions: google.maps.DirectionsResult;
}
export default function DirectionsRenderer({ directions }: DirectionsRendererProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({suppressMarkers: true, map, preserveViewport: true}));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsRenderer) return;

    
    directionsRenderer.setDirections(directions);
    

    return () => directionsRenderer.setMap(null);
  }, [directions, directionsRenderer]);

  return null;
}