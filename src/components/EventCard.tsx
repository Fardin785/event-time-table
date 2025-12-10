import * as React from "react";
import type { EventItem } from "../types/event";

interface EventCardProps {
  event: EventItem;
  top: number;
  height: number;
  left: number;
  width: number;
  color?: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, top, height, left, width, color }) => {
  return (
    <div
      className="absolute rounded border shadow-sm bg-blue-50 hover:bg-blue-100 transition hover:z-[9999]"
      style={{ top, left, height, width }}
    >
      <div className="h-1 rounded-t" style={{ backgroundColor: color || "#3b82f6" }} />
      <div className="p-2">
        <div className="font-medium text-sm truncate">{event.title}</div>
        <div className="text-xs text-gray-600">
          {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
          {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
};
