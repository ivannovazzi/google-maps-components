import { useEffect, useState } from "react";
import { Clusterable } from "../types";
interface Options {
  interval?: number;
  amount?: number;
}

export default function useFakeChangePositions<T extends Clusterable>(
  data: T[],
  options: Options
): T[] {
  const { interval = 1000, amount = 1 } = options;
  const [d, setD] = useState<T[]>(data);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const n = d.map((dataItem) => {
        return {
          ...dataItem,
          _pos: {
            lat: dataItem._pos.lat + Math.random() * amount - amount / 2,
            lng: dataItem._pos.lng + Math.random() * amount - amount / 2,
          },
        };
      });
      setD(n);
    }, interval);
    return () => clearInterval(intervalId);
  }, [amount, d, interval]);

  return d;
}
