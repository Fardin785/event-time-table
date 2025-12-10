import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { EventItem, Venue } from "../types/event";

import { createEventSchema, type CreateEventFormValues } from "../schemas/event.schema";
import { toLocalDateInputValue, toLocalISO } from "../utils/date";
import { MultiSelectDropdown } from "./ui/MultiSelectDropdown";

type Props = {
  venues: Venue[];
  defaultDate: Date;
  onAdd: (event: EventItem) => void;
};

export const AddEventForm: React.FC<Props> = ({ venues, defaultDate, onAdd }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      date: toLocalDateInputValue(defaultDate),
      startTime: "09:00",
      endTime: "10:00",
      venueIds: [],
    },
  });

  const onSubmit = (values: CreateEventFormValues) => {
    const event: EventItem = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      venueIds: values.venueIds,
      start: toLocalISO(values.date, values.startTime),
      end: toLocalISO(values.date, values.endTime),
    };
    onAdd(event);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="font-semibold text-lg">Create Event</h3>

      <div>
        <label className="text-sm font-medium">Event Title</label>
        <input {...register("title")} className="border rounded px-3 py-2 w-full" />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="text-sm font-medium">Date</label>
        <input type="date" {...register("date")} className="border rounded px-3 py-2 w-full" />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium">Start Time</label>
          <input type="time" step={900} {...register("startTime")} className="border rounded px-3 py-2 w-full" />
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium">End Time</label>
          <input type="time" step={900} {...register("endTime")} className="border rounded px-3 py-2 w-full" />
        </div>
      </div>

      {errors.endTime && <p className="text-red-600 text-sm mt-1">{errors.endTime.message}</p>}

      <div>
        <label className="text-sm font-medium">Select Venues</label>

        <Controller
          name="venueIds"
          control={control}
          render={({ field }) => (
            <MultiSelectDropdown
              options={venues.map((v) => ({
                id: v.id,
                label: v.name,
              }))}
              selectedIds={field.value}
              onChange={field.onChange}
              placeholder="Select venues"
            />
          )}
        />

        {errors.venueIds && <p className="text-red-600 text-sm mt-1">{errors.venueIds.message}</p>}
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Add Event
      </button>
    </form>
  );
};
