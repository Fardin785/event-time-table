import * as React from "react";
import type { EventItem, Venue } from "./types/event";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { WeekTabs } from "./components/WeekTabs";
import { Scheduler } from "./components/Scheduler";
import { AddVenueForm } from "./components/AddVenueForm";
import { AddEventForm } from "./components/AddEventForm";

function getWeek(startFrom: Date) {
  const days: Date[] = [];
  const base = new Date(startFrom);
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    days.push(d);
  }
  return days;
}

const seedVenues: Venue[] = [
  { id: "v1", name: "Venue A", color: "#ef4444" },
  { id: "v2", name: "Venue B", color: "#3b82f6" },
  { id: "v3", name: "Venue C", color: "#10b981" },
];

const seedEvents: EventItem[] = [
  {
    id: "e1",
    title: "Joint Session",
    venueIds: ["v1", "v2"],
    start: "2025-12-10T09:00:00",
    end: "2025-12-10T10:30:00",
  },
  {
    id: "e2",
    title: "Tech Setup",
    venueId: "v3",
    start: "2025-12-10T11:30:00",
    end: "2025-12-10T13:00:00",
  },
];

export default function App() {
  const [venues, setVenues] = useLocalStorage<Venue[]>("etVenues", seedVenues);
  const [events, setEvents] = useLocalStorage<EventItem[]>("etEvents", seedEvents);
  const [selectedIndex, setSelectedIndex] = useLocalStorage<number>("etSelectedIndex", 0);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const days = React.useMemo(() => getWeek(new Date()), []);
  const selectedDay = days[Math.min(selectedIndex, days.length - 1)];

  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col md:flex-row overflow-hidden">
      <div className="md:hidden p-2 bg-white border-b flex justify-between items-center">
        <h2 className="font-semibold text-lg">Scheduler</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="px-3 py-1 bg-blue-600 text-white rounded">
          {isSidebarOpen ? "Close" : "Add Event / Venue"}
        </button>
      </div>

      <aside
        className={`
          bg-white border-r p-4 space-y-6 
          md:w-80 md:shrink-0 md:block
          ${isSidebarOpen ? "block w-full absolute z-50 top-12 left-0 bottom-0" : "hidden"}
        `}
      >
        <AddVenueForm onAdd={(v) => setVenues([...venues, v])} />
        <AddEventForm venues={venues} defaultDate={selectedDay} onAdd={(e) => setEvents([...events, e])} />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <WeekTabs selectedIndex={selectedIndex} onChange={setSelectedIndex} days={days} />
        <div className="flex-1 overflow-auto">
          <Scheduler date={selectedDay} venues={venues} events={events} />
        </div>
      </main>
    </div>
  );
}
