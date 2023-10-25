import styles from "./CalendarEventForm.module.css";
import TextInput from "../../ui/TextInput/TextInput";
import { Calendar } from "../../ui/icons";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button } from "../../ui";
import { useAppContext } from "../../context/app";
import { postEvent } from "../../services/events";
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
  console.log(eventsOnThisDay);

  const onTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  const onCancel = () => {
    updateOpenPopoverIndex("");
  };
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await postEvent({ date: date.valueOf(), title });
    await fetchAndUpdateCalendarEvents();
    setLoading(false);
    updateOpenPopoverIndex("");
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
          />
        </div>
        <div className={styles.content}>
          <Calendar />
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
          {eventsOnThisDay.map((event, i) => (
            <div className={styles.eventRow} key={i}>
              <span>{event.title}</span>
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default CalendarEventForm;
