import * as React from "react";
import { TimeColumn } from "./TimeColumn";
import { VenueHeader } from "./VenueHeader";
import { EventGrid } from "./EventGrid";
import {
  VENUE_COL_WIDTH,
  SLOT_MINUTES,
  SLOT_HEIGHT,
  START_HOUR,
  END_HOUR,
  VENUE_HEADER_H,
} from "../config/scheduler.config";
import type { EventItem, Venue } from "../types/event";
import { useHorizontalTransformSync } from "../hooks/useHorizontalSync";

type Props = {
  date: Date;
  venues: Venue[];
  events: EventItem[];
};

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function Scheduler({ date, venues, events }: Props) {
  const totalMinutes = (END_HOUR - START_HOUR) * 60;
  const totalSlots = totalMinutes / SLOT_MINUTES;
  const dayHeight = totalSlots * SLOT_HEIGHT;

  const trackWidth = venues.length * VENUE_COL_WIDTH;
  const eventsForDay = events.filter((e) => isSameDay(new Date(e.start), date));

  const indexMap = React.useMemo(() => new Map(venues.map((v, i) => [v.id, i])), [venues]);

  const getSegments = (e: EventItem) => {
    const ids = e.venueIds?.length ? e.venueIds : [e.venueId].filter((id): id is string => !!id);
    const indices = ids
      .map((id) => indexMap.get(id))
      .filter((v): v is number => v !== undefined)
      .sort((a, b) => a - b);

    if (!indices.length) return [];

    const startMin = new Date(e.start).getHours() * 60 + new Date(e.start).getMinutes();
    const endMin = new Date(e.end).getHours() * 60 + new Date(e.end).getMinutes();

    const top = (startMin / SLOT_MINUTES) * SLOT_HEIGHT;
    const height = Math.max(SLOT_HEIGHT, ((endMin - startMin) / SLOT_MINUTES) * SLOT_HEIGHT);

    return [
      {
        left: indices[0] * VENUE_COL_WIDTH,
        width: indices.length * VENUE_COL_WIDTH,
        top,
        height,
      },
    ];
  };

  const { headerInnerRef, gridRef } = useHorizontalTransformSync();

  return (
    <div className="h-[calc(100vh-160px)] overflow-y-auto overflow-x-hidden">
      <div className="flex min-h-full">
        <TimeColumn
          startHour={START_HOUR}
          endHour={END_HOUR}
          slotMinutes={SLOT_MINUTES}
          slotHeight={SLOT_HEIGHT}
          headerHeight={VENUE_HEADER_H}
          columnWidth={120}
        />

        <div className="flex-1 min-w-0">
          <VenueHeader venues={venues} width={trackWidth} innerRef={headerInnerRef} />

          <EventGrid
            venues={venues}
            events={eventsForDay}
            trackWidth={trackWidth}
            dayHeight={dayHeight}
            totalSlots={totalSlots}
            getSegments={getSegments}
            scrollRef={gridRef}
          />
        </div>
      </div>
    </div>
  );
}
