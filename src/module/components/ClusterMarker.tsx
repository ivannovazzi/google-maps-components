import "./ClusterMarker.scss";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { memo } from "react";
import { Clusterable } from "../types";

interface ClusterMarkerCompoenentProps<T extends Clusterable> {
  id: number;
  items: T[];
  position: google.maps.LatLngLiteral;
  onClick?: () => void;
}
function ClusterMarkerComponent<T extends Clusterable>(
  { id, items, position, onClick }: ClusterMarkerCompoenentProps<T>,
) {
  
  const length = items.length;
  const label = length;
  const background = ["white", "red", "orange", "yellow", "green", "blue", "black"][length % 5];
  return (
    <AdvancedMarker position={position} onClick={onClick}>
      <div className="cluster-marker" style={{ background, padding: 20 }}>{id} : {label}</div>
    </AdvancedMarker>
  );
}

export default memo(ClusterMarkerComponent);
