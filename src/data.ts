export type DataPoint = {
  id: string;
  lat: number;
  lng: number;
};

export default function makeData(count: number): DataPoint[] {
  return new Array(count).fill(0).map((_, i) => {
    const lat = Math.random() * 30 - 15;
    const lng = Math.random() * 40 - 20;
    return {
      id: i.toString(),
      lat,
      lng,
    };
  });
}
