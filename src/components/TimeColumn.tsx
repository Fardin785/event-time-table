import * as React from "react";

type Props = {
  startHour: number; // e.g., 0
  endHour: number; // e.g., 24
  slotMinutes: number; // e.g., 15
  slotHeight: number; // px per slot
  headerHeight: number; // sticky venue header height
  columnWidth?: number; // width of the time column
};

export const TimeColumn: React.FC<Props> = ({
  startHour,
  endHour,
  slotMinutes,
  slotHeight,
  headerHeight,
  columnWidth = 120,
}) => {
  const totalMinutes = (endHour - startHour) * 60;
  const totalSlots = Math.ceil(totalMinutes / slotMinutes);
  const labels: string[] = [];

  for (let i = 0; i <= totalSlots; i++) {
    const minutesFromStart = i * slotMinutes;
    const h = Math.floor(minutesFromStart / 60) + startHour;
    const m = minutesFromStart % 60;
    labels.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }

  const columnHeight = totalSlots * slotHeight;

  return (
    <div
      className="sticky left-0 z-20 bg-white border-r shrink-0"
      style={{
        width: columnWidth,
        height: headerHeight * 2 + columnHeight,
      }}
    >
      <div style={{ height: headerHeight }} />

      <div style={{ height: columnHeight }} className="border-t">
        {labels.map((label, idx) => (
          <div
            key={idx}
            className="flex items-center justify-end pr-2 border-b"
            style={{
              height: slotHeight,
              fontSize: "0.95rem",
              color: "#4b5563",
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};
