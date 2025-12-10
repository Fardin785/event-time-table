import { EventCard } from "./EventCard";
import type { EventItem, Venue } from "../types/event";
import { SLOT_HEIGHT, VENUE_COL_WIDTH } from "../config/scheduler.config";

type Segment = {
  top: number;
  height: number;
  left: number;
  width: number;
};

type Props = {
  venues: Venue[];
  events: EventItem[];
  trackWidth: number;
  dayHeight: number;
  totalSlots: number;
  getSegments: (e: EventItem) => Segment[];
  scrollRef: React.Ref<HTMLDivElement>;
};

export function EventGrid({ venues, events, trackWidth, dayHeight, totalSlots, getSegments, scrollRef }: Props) {
  return (
    <div ref={scrollRef} className="overflow-x-auto no-scrollbar pb-5 border-b">
      <div className="relative" style={{ width: trackWidth, height: dayHeight }}>
        <div className="absolute inset-0 flex">
          {venues.map((v) => (
            <div key={v.id} className="border-r" style={{ width: VENUE_COL_WIDTH }}>
              {Array.from({ length: totalSlots }).map((_, i) => (
                <div key={i} style={{ height: SLOT_HEIGHT }} className="border-b border-gray-100" />
              ))}
            </div>
          ))}
        </div>

        <div className="absolute inset-0">
          {events.map((e) =>
            getSegments(e).map((s, i) => {
              const venueIdx = Math.floor(s.left / VENUE_COL_WIDTH);
              return (
                <EventCard
                  key={`${e.id}-${i}`}
                  event={e}
                  top={s.top}
                  height={s.height}
                  left={s.left}
                  width={s.width}
                  color={venues[venueIdx]?.color}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
