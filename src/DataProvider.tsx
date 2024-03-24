import { useFakeMovements } from "./module/hooks";
import makeData from "./data";
import App from "./App";
import useClusterable from "./module/hooks/useClusterable";
import useRotation from "./module/hooks/useRotation";

const data = makeData(1000);

export default function Data() {
  const vehicles = useClusterable(data, (p) => p.id, (p) => ({ lat: p.lat, lng: p.lng }))
  
  const changingVehicles = useFakeMovements(vehicles, {
    interval: 5000,
    amount: 0.3,
  });

  const rotatedVehicles = useRotation(changingVehicles);
  

  return <App vehicles={rotatedVehicles} />;
}
