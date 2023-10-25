import { v4 as uuidv4 } from "uuid";
import styles from "./CalendarEventForm.module.css";
import TextInput from "../../ui/TextInput/TextInput";
import { Bin, Calendar as CalendarIcon } from "../../ui/icons";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "../../ui";
import useAppContext from "../../context/useAppContext";
import { CalendarEvent, deleteEvent, postEvent } from "../../services/events";
import { getEventsOfTheDate } from "../../utils/date";

type Props = {
  date: Date;
};

const CalendarEventForm: FC<Props> = ({ date }) => {
  const {
    updateOpenPopoverIndex,
    fetchAndUpdateCalendarEvents,
    calendarEvents,
  } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const eventsOnThisDay = getEventsOfTheDate(calendarEvents, date);

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onCancel = () => {
    updateOpenPopoverIndex("");
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (title) {
      await postEvent({ date: date.valueOf(), title, id: uuidv4() }); // BE should generate the ID
      await fetchAndUpdateCalendarEvents();
      setLoading(false);
      setTitle("");
    }
  };
  const onDelete = async (calendarEvent: CalendarEvent) => {
    setLoading(true);
    await deleteEvent(calendarEvent);
    await fetchAndUpdateCalendarEvents();
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}>
        <div className={styles.header}>
          <TextInput
            value={title}
            onChange={onTitleChange}
            placeholder="Add new event"
            required
            maxLength={26}
          />
        </div>
        <div className={styles.content}>
          <CalendarIcon />
          <span>{date.toDateString()}</span>
        </div>
        <div className={styles.footer}>
          <Button disabled={loading} accent="POSITIVE" role="submit">
            Save
          </Button>
          <Button disabled={loading} accent="NEGATIVE" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
      {eventsOnThisDay.length ? (
        <>
          <hr />
          <h5>Other events</h5>
          {eventsOnThisDay.map((calendarEvent, i) => (
            <div className={styles.eventRow} key={i}>
              <span>{calendarEvent.title}</span>
              <Button
                data-testid="delete-button"
                disabled={loading}
                onClick={() => onDelete(calendarEvent)}
              >
                <Bin />
              </Button>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default CalendarEventForm;
