import Calendar from "./components/calendar/Calendar";
import AppContextProvider from "./context/app";

function App() {
  return (
    <div className="App">
      <AppContextProvider date={new Date()}>
        <h3>Calendar</h3>
        <Calendar />
      </AppContextProvider>
    </div>
  );
}

export default App;
