export type Venue = {
  id: string;
  name: string;
  color?: string;
};

export type EventItem = {
  id: string;
  title: string;
  venueId?: string;
  venueIds?: string[];
  start: string;
  end: string;
};
