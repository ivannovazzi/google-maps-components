import { useEffect } from "react";
import { Clusterable, MarkerMap, LatLngLiteral, AdvancedMarkerElement } from "../types";

function easeOutQuad(t: number, b: number, c: number, d: number) {
  t /= d;
  return -c * t * (t - 2) + b;
}

function handle180Meridian(lng: number, startLng: number) {
  // crossing the 180° meridian and going the long way around the earth?
  if (Math.abs(lng - startLng) > 180) {
    if (lng > startLng) {
      return lng - 360;
    } else {
      return lng + 360;
    }
  }
  return lng;
}

function safePosition(position: string | undefined) {
  return position ? parseFloat(position) : 0;
}

function safe(position: number | undefined) {
  return position || 0;
}

// https://stackoverflow.com/a/55043218/9058905
export function animateMarkerTo(
  marker: AdvancedMarkerElement,
  newPosition: LatLngLiteral,
) {
  // save current position. prefixed to avoid name collisions. separate for lat/lng to avoid calling lat()/lng() in every frame
  const _startLat = safePosition(marker.position?.lat.toString());
  const _startLng = safePosition(marker.position?.lng.toString());
  const newPosition_lat = newPosition.lat;
  const newPosition_lng = handle180Meridian(newPosition.lng, _startLng);
  let _animHandler: number = 0;

  function animateStep(stepMarker: AdvancedMarkerElement, startTime: number) {
    const options = {
      duration: 1000,
      easing: easeOutQuad,
      delay: 300,
    };
    const elapsed = (new Date().getTime() - options.delay) - startTime;
    const elapsedRatio = elapsed / (options.duration + options.delay); // 0 - 1
    const easing = options.easing(elapsed, 0, 1, options.duration + options.delay);    

    if (elapsedRatio < 1) {
      if (elapsedRatio > 0) {      
        stepMarker.position = {
          lat: safe(_startLat) + (newPosition_lat - safe(_startLat)) * easing,
          lng: safe(_startLng) + (newPosition_lng - safe(_startLng)) * easing,
        };
      }
      _animHandler = window.requestAnimationFrame(function () {
        animateStep(stepMarker, startTime);
      });
    } else {
      stepMarker.position = newPosition;
    }
  }

  // stop possibly running animation
  window.cancelAnimationFrame(_animHandler || 0);

  animateStep(marker, new Date().getTime());
}

export default function useMarkerAnimation<T extends Clusterable>(
  items: T[],
  markerMap: MarkerMap
) {
  useEffect(() => {
    items.forEach((item) => {
      const position = item._pos;
      const marker = markerMap[item._key];
      const currentPosition = marker?.position;
      if (!currentPosition) {
        return;
      }
      if (
        currentPosition?.lat !== position.lat ||
        currentPosition?.lng !== position.lng
      ) {
        animateMarkerTo(marker, position);
      }
    });
  }, [items, markerMap]);
}
