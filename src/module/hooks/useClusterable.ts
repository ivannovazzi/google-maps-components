import { useEffect, useRef } from "react";
import { Clusterable, LatLngLiteral } from "../types";

export function toClusterable<T>(
  item: T,
  keyFn: (item: T) => string,
  posFn: (item: T) => LatLngLiteral
): Clusterable<T> {
  return { _src: item, _key: keyFn(item), _pos: posFn(item), _rotation: 0 };
}

export default function useClusterable<T>(
  items: T[],
  keyFn: (item: T) => string,
  posFn: (item: T) => LatLngLiteral
) {
  const ref = useRef<Clusterable<T>[]>(items.map((item) => toClusterable(item, keyFn, posFn)));
  useEffect(() => {
    ref.current = items.map((item) => toClusterable(item, keyFn, posFn));
  }, [items, keyFn, posFn]);

  return ref.current;
}
