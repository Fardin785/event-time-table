import { useState } from "react";
import type { EventItem, Venue } from "../types/event";
import { MultiSelectDropdown } from "./ui/MultiSelectDropdown";

type Props = {
  venues: Venue[];
  defaultDate: Date;
  onAdd: (e: EventItem) => void;
};

export const AddEventForm: React.FC<Props> = ({ venues, defaultDate, onAdd }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => defaultDate.toISOString().slice(0, 10));
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [selectedVenueIds, setSelectedVenueIds] = useState<string[]>([]);
  const [error, setError] = useState("");

  const toLocalISO = (yyyyMMdd: string, hhmm: string) => {
    const [y, m, d] = yyyyMMdd.split("-").map(Number);
    const [hh, mm] = hhmm.split(":").map(Number);
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}T${String(hh).padStart(2, "0")}:${String(
      mm
    ).padStart(2, "0")}:00`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Event title is required.");
    if (selectedVenueIds.length === 0) return setError("Please select at least one venue.");
    if (startTime >= endTime) return setError("Start time must be before end time.");

    const event: EventItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      venueIds: selectedVenueIds,
      start: toLocalISO(date, startTime),
      end: toLocalISO(date, endTime),
    };

    onAdd(event);

    setTitle("");
    setSelectedVenueIds([]);
    setStartTime("09:00");
    setEndTime("10:00");
    setError("");
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <h3 className="font-semibold text-lg">Create Event</h3>
      {error && <p className="text-red-600 text-sm">{error}</p>}

      <div className="flex flex-col">
        <label htmlFor="event-title" className="text-sm font-medium mb-1">
          Event Title
        </label>
        <input
          id="event-title"
          type="text"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="event-date" className="text-sm font-medium mb-1">
          Date
        </label>
        <input
          id="event-date"
          type="date"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex-1 flex flex-col">
          <label htmlFor="start-time" className="text-sm font-medium mb-1">
            Start Time
          </label>
          <input
            id="start-time"
            type="time"
            step={900}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <label htmlFor="end-time" className="text-sm font-medium mb-1">
            End Time
          </label>
          <input
            id="end-time"
            type="time"
            step={900}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:ring-blue-200"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Select Venues</label>
        <MultiSelectDropdown
          options={venues.map((v) => ({ id: v.id, label: v.name }))}
          selectedIds={selectedVenueIds}
          onChange={setSelectedVenueIds}
          placeholder="Select venues"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
      >
        Add Event
      </button>
    </form>
  );
};
