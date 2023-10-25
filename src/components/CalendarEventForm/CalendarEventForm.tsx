import { v4 as uuidv4 } from "uuid";
import styles from "./CalendarEventForm.module.css";
import TextInput from "../../ui/TextInput/TextInput";
import Icon from "../../ui/icon";
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
          <Button
            type="button"
            className={styles.crossButton}
            icon
            onClick={onCancel}
          >
            <Icon name="cross" />
          </Button>
        </div>
        <div className={styles.content}>
          <Icon name="sun" />
          <div>
            {date.toLocaleString("default", { weekday: "long" })}
            {", "}
            {date.getDate()}{" "}
            {date.toLocaleString("default", { month: "short" })}
          </div>
        </div>
        <div className={styles.content}>
          <b>32 ℃</b>
          <small>Mostly sunny. Light wind.</small>
        </div>
        <div className={styles.footer}>
          <Button
            className={styles.saveButton}
            disabled={loading}
            accent="POSITIVE"
            role="submit"
          >
            Save
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
                icon
                className={styles.deleteButton}
              >
                <Icon width={20} height={20} name="bin" />
              </Button>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default CalendarEventForm;
