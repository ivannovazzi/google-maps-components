
interface InfoBoxProps {
  offsetLeft?: number;
  offestBottom?: number;
  children: React.ReactNode;
}
export default function InfoBox({ offsetLeft = 0 , offestBottom = 30, children }: InfoBoxProps) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 10000,
        bottom: offestBottom,
        left: offsetLeft,
      }}
    >
      {children}
    </div>
  );
}
