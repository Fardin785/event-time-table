import { useState } from "react";
import type { Venue } from "../types/event";

type Props = {
  onAdd: (venue: Venue) => void;
};

export const AddVenueForm: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#10b981");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      color,
    });

    setName("");
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <h3 className="font-semibold text-sm">Create Venue</h3>

      <input
        className="w-full border rounded px-2 py-1"
        placeholder="Venue name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="color"
        className="w-full h-10 border rounded"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <button className="w-full bg-emerald-600 text-white py-1.5 rounded">Add Venue</button>
    </form>
  );
};
