const EVENTS_KEY = "REACT_CALENDAR_APP_EVENTS";

// this typing is here, because probably this depends on backend response.
export type CalendarEvent = {
  date: number; // Date.valueOf
  title: string;
  id: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// GET /api/events
export const getEvents = async (): Promise<Record<number, CalendarEvent[]>> => {
  await sleep(300); // simulate api call.
  const events = window.sessionStorage?.getItem(EVENTS_KEY) || "{}";
  return JSON.parse(events);
};

// POST /api/events
export const postEvent = async (calendarEvent: CalendarEvent) => {
  if (window.sessionStorage) {
    // normally we don't need to fetch here at real api.
    const eventsObject = await getEvents();
    if (eventsObject[calendarEvent.date]) {
      eventsObject[calendarEvent.date].push(calendarEvent);
    } else {
      eventsObject[calendarEvent.date] = [calendarEvent];
    }
    window.sessionStorage.setItem(EVENTS_KEY, JSON.stringify(eventsObject));
  }
};

// DELETE /api/events/${id}
export const deleteEvent = async (calendarEvent: CalendarEvent) => {
  if (window.sessionStorage) {
    const eventsObject = await getEvents();
    if (eventsObject[calendarEvent.date]) {
      eventsObject[calendarEvent.date] = eventsObject[
        calendarEvent.date
      ].filter((event) => event.id !== calendarEvent.id);
      window.sessionStorage.setItem(EVENTS_KEY, JSON.stringify(eventsObject));
    }
  }
};

// delete all events
export const resetEvents = () => {
  window.sessionStorage?.setItem(EVENTS_KEY, "");
};
