import { useMap } from "@vis.gl/react-google-maps";
import Supercluster from "supercluster";
import GeoJSON from "geojson";
import { useState, useEffect, useMemo } from "react";
import { CProps, Clusterable, ClusterF, LatLngLiteral, PointF } from "../types";
import { formatDataToGeoJsonPoints, getClusterKey } from "../utils";

type RenderMarker<C extends Clusterable> = (props: {
  position: LatLngLiteral;
  item: C;
}) => void;

type RenderCluster<C extends Clusterable> = (props: {
  position: LatLngLiteral;
  items: C[];
  id: number;
  key: string;
  onClick: () => void;
}) => void;

interface SuperClusterConfig {
  radius: number;
  maxZoom: number;
}

interface ClustererProps<C> {
  items: Clusterable<C>[];
  zoom: number;
  config: SuperClusterConfig;
  bounds: GeoJSON.BBox;
  renderMarker: RenderMarker<Clusterable<C>>;
  renderCluster: RenderCluster<Clusterable<C>>;
}

export default function Clusterer<C>({
  items,
  zoom,
  bounds,
  config,
  renderMarker,
  renderCluster,
}: ClustererProps<C>) {
  const map = useMap();
  const sc = useMemo(
    () =>
      new Supercluster<CProps<C>, CProps<C>>({
        maxZoom: config.maxZoom,
        radius: config.radius,
        extent: 512,
        nodeSize: 1024,
      }),
    [config.maxZoom, config.radius]
  );

  function handleClusterClick({
    id,
    lat,
    lng,
  }: {
    id: number;
    lat: number;
    lng: number;
  }) {
    const expansionZoom = Math.min(sc.getClusterExpansionZoom(id), 20);
    map?.setZoom(expansionZoom);
    map?.panTo({ lat, lng });
  }

  const [clusters, setClusters] = useState<(PointF<C> | ClusterF<C>)[]>([]);
  useEffect(() => {
    if (items?.length && bounds) {
      sc.load(formatDataToGeoJsonPoints(items));
      setClusters(sc.getClusters(bounds, zoom));      
    }
  }, [items, bounds, zoom, sc]);  

  return (
    <>
      {clusters.map(({ id, geometry, properties }) => {
        const [lng, lat] = geometry.coordinates;
        const { cluster, item } = properties;
        const position = { lat, lng };
        if (cluster) {
          const items = sc.getLeaves(id as number, Infinity).map((f) => f.properties.item);
          return renderCluster({
            items,
            position,
            id: id as number,
            key: getClusterKey(items),
            onClick: () => handleClusterClick({ id: id as number, lat, lng }),
          });
        } else {
          return renderMarker({ position, item });
        }
      })}
    </>
  );
}
