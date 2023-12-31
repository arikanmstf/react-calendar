import Calendar from "./components/Calendar";
import AppContextProvider from "./context/AppContextProvider";
import styles from "./app.module.css";

function App() {
  return (
    <div className="App">
      <AppContextProvider date={new Date()}>
        <div className={styles.calendarWrapper}>
          <div className={styles.calendarContainer}>
            <Calendar />
          </div>
        </div>
      </AppContextProvider>
    </div>
  );
}

export default App;
