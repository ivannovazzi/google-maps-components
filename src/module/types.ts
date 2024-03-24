import { type BBox } from "geojson";
import { ClusterFeature, PointFeature } from "supercluster";
export { type MapCameraChangedEvent } from "@vis.gl/react-google-maps";

export type AdvancedMarkerElement = google.maps.marker.AdvancedMarkerElement;
export type MarkerMap = Record<string, AdvancedMarkerElement>;
export type Bounds = BBox;
export type LatLngLiteral = google.maps.LatLngLiteral;

export type Clusterable<T = unknown> = {
  _src: T;
  _key: string;
  _pos: LatLngLiteral;
  _rotation: number;
};
export type CProps<T> = { cluster: boolean; item: Clusterable<T> };

export type PointF<T> = PointFeature<CProps<T>>;
export type ClusterF<T> = ClusterFeature<CProps<T>>;
