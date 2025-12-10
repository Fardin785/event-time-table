import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Venue } from "../types/event";
import { venueSchema, type VenueFormValues } from "../schemas/venue.schema";

type Props = {
  onAdd: (venue: Venue) => void;
};

export const AddVenueForm: React.FC<Props> = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VenueFormValues>({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: "",
      color: "#10b981",
    },
  });

  const submit = (data: VenueFormValues) => {
    onAdd({
      id: crypto.randomUUID(),
      name: data.name.trim(),
      color: data.color,
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-3">
      <h3 className="font-semibold text-sm">Create Venue</h3>

      <div>
        <input
          {...register("name")}
          placeholder="Venue name"
          className="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:ring-emerald-200"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input type="color" {...register("color")} className="w-full h-10 border rounded cursor-pointer" />
        {errors.color && <p className="text-red-600 text-sm mt-1">{errors.color.message}</p>}
      </div>

      <button type="submit" className="w-full bg-emerald-600 text-white py-1.5 rounded hover:bg-emerald-700 transition">
        Add Venue
      </button>
    </form>
  );
};
