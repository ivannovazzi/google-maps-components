import "./IconMarker.scss";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { forwardRef, memo } from "react";
import { LatLngLiteral, AdvancedMarkerElement  } from "../types";

interface IconMarkerComponentProps {
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  position: LatLngLiteral;
  rotate?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}
function IconMarkerComponent(
  { position, icon, rotate, children, onClick }: IconMarkerComponentProps,
  ref: React.ForwardedRef<AdvancedMarkerElement>
) {
  return (
    <AdvancedMarker ref={ref} position={position} onClick={onClick} zIndex={children ? 10000: undefined}>
      <div className="icon-marker" style={{ transform: `rotate(${rotate}deg)` }}>
        {icon}
      </div>
      {children}
    </AdvancedMarker>
  );
}

export default memo(forwardRef(IconMarkerComponent));