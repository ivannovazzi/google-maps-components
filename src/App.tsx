import { Map } from "@vis.gl/react-google-maps";
import { ReactComponent as TestSvg } from "./assets/test.svg";
import { useState } from "react";
import { Clusterer, IconMarker, ClusterMarker } from "./module/components";
import {
  useMarkerRefs,
  useBounds,
  useZoom,
  useMarkerAnimation,
} from "./module/hooks";
import { DataPoint } from "./data";
import directions from "./directions";
import { getLatLngPosition } from "./module/utils";
import { Clusterable } from "./module/types";
import InfoBox from "./module/components/InfoBox";
import DirectionsRenderer from "./module/components/DirectionsRenderer";

interface AppProps {
  vehicles: Clusterable<DataPoint>[];
}

export default function App({ vehicles }: AppProps) {
  const [infoBox, setInfoBox] = useState<DataPoint | null>(null);
  const [markers, setMarker] = useMarkerRefs();
  const [bounds, handleBoundsChanged] = useBounds();
  const [zoom, handleZoomChanged] = useZoom(6);
  
  useMarkerAnimation(vehicles, markers);

  return (
    <Map
      mapId="DEMO_MAP_ID"
      defaultCenter={{ lat: 22.54992, lng: 0 }}
      defaultZoom={3}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      onBoundsChanged={handleBoundsChanged}
      onZoomChanged={handleZoomChanged}      
    >
      {directions.map((direction: any, i: any) => (
        <DirectionsRenderer directions={direction} key={i}/>
      ))}
      
      <Clusterer
        items={vehicles}
        zoom={zoom}
        bounds={bounds}
        config={{ radius: 60, maxZoom: 20 }}
        renderMarker={(props) => (
          <IconMarker
            ref={(marker) => setMarker(marker, props.item._key)}
            position={getLatLngPosition(props.item, markers)}
            rotate={props.item._rotation}
            icon={<TestSvg width={20} height={20} />}
            key={props.item._key}
            onClick={() => setInfoBox(props.item._src)}
            children={
              infoBox?.id === props.item._src.id && (
                <InfoBox>
                  <div style={{ background: "red" }}>TEST</div>
                </InfoBox>
              )
            }
          />
        )}
        renderCluster={(props) => (
          <ClusterMarker
            id={props.id}
            items={props.items}
            position={props.position}
            key={props.key}
            onClick={props.onClick}
          />
        )}
      />
    </Map>
  );
}
