import { VENUE_COL_WIDTH } from "../config/scheduler.config";
import type { Venue } from "../types/event";

type Props = {
  venues: Venue[];
  width: number;
  innerRef: React.Ref<HTMLDivElement>;
};

export function VenueHeader({ venues, width, innerRef }: Props) {
  return (
    <div className="sticky top-0 z-30 bg-white border-b overflow-hidden">
      <div ref={innerRef} style={{ width }} className="flex will-change-transform">
        {venues.map((v) => (
          <div key={v.id} style={{ width: VENUE_COL_WIDTH }} className="flex items-center px-3 border-r">
            <span className="w-2 h-4 rounded mr-2" style={{ backgroundColor: v.color || "#10b981" }} />
            <span className="font-medium truncate">{v.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
