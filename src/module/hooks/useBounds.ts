import { useState } from "react";

import { Bounds, MapCameraChangedEvent } from "../types";

export default function useBounds(bounds: Bounds = [0, 0, 0, 0]): [Bounds, (event: MapCameraChangedEvent) => void] {
  const [currentBounds, setBounds] = useState<Bounds>(bounds);

  function handleBoundsChanged(event: MapCameraChangedEvent) {
    const mapBounds = event.map.getBounds()?.toJSON();
    setBounds([
      mapBounds?.west || 0,
      mapBounds?.south || 0,
      mapBounds?.east || 0,
      mapBounds?.north || 0,
    ]);
  }

  return [currentBounds, handleBoundsChanged];
}