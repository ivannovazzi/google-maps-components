import { Clusterable, MarkerMap, PointF, LatLngLiteral } from "./types";

export function toClusterable<T>(
  item: T,
  keyFn: (item: T) => string,
  posFn: (item: T) => LatLngLiteral
): Clusterable<T> {
  return { _src: item, _key: keyFn(item), _pos: posFn(item), _rotation: 0 };
}

export function getLatLngPosition<T extends Clusterable<unknown>>(
  item: T,
  markerMap: MarkerMap
) {
  if (markerMap[item._key]?.position) {
    // @ts-expect-error
    return new google.maps.LatLng(markerMap[item._key].position).toJSON();
  }
  return item._pos;
}

export function formatDataToGeoJsonPoints<T>(
  data: Clusterable<T>[]
): PointF<T>[] {
  return data.map((item) => ({
    type: "Feature",
    geometry: { type: "Point", coordinates: [item._pos.lng, item._pos.lat] },
    properties: { cluster: false, item },
  }));
}


export function getClusterKey(items: Clusterable[]) {
  return items.map((i) => i._key).sort().join("-");
}