# react-calendar

Compact calendar widget built in react with event support.

### Demo
* Application is live at: https://arikanmstf.github.io/react-calendar/

### Install
* Clone the repo, install and run;
* `$ git clone https://github.com/arikanmstf/react-calendar.git`
* `$ yarn install --frozen-lockfile`
* `$ yarn start`
* Visit: http://localhost:3000/

### Features
* In general, inspired by Google and MacOs's calendar.
* Responsive design, min-width: `330px`
* Strict Typescript type checking.
* Navigation between the months (previous and next).
  - Animations on previous and next month transitions.
  - Jump to current day.
  - Jump to any year (50 year range)
* Easy event management with simple click on the cells.
  - Saves to the session store, it can easily switch to be persistent, see `AppContextProvider.tsx`.
  - Lists events of the day when user clicked on the cells.
  - Easy deletion of desired events.
  - Simple HTML based input validation at event title.
  - Event CRUD operations made in async way, so it can easily be applied to the backend api in the future. See `src/services/events.ts`.
  - Small ios-like indicators when day has an event on it.

### Testing
* Linting with eslint and prettier; Run `yarn lint`
* Covered by unit tests with RTL & Jest. Coverage: 90%. See the coverage report at repository actions.

### Automation
* When pushed to master; runs tests and if tests passed, builds and deploys to GitHub pages
* Using GitHub actions, see `build.yml`

### Technical Discussion
* Full client-side rendering, powered by create-react-app
* No any 3rd party date-time libraries used, such as moment-js etc. Only ES builtin Date api.

#### State management
* No any 3rd party state manager libraries used. React's Context Api with reducers was very much enough.
* Using React's reducers and actions. App keeps the state at the context provider and only gets updated by dispatch function.
See `appReducer.tsx` `useAppContext.ts` and `AppContextProvider.tsx`.


#### How animation works?
* Even tho, user is seeing one month at a time, in fact there are 3 months getting rendered every time.
So they are next and previous months. App always keeps three months in the state and according to this state renders these month views.
When user interacts with the button, say to the next month; while pre-rendered next month is moving into the view port,
app is updating the state with the new middle-month. And before transition completed new months getting to their place.

#### Test Coverage
----------------------------------|---------|----------|---------|---------|-------------------------
File                              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s       
----------------------------------|---------|----------|---------|---------|-------------------------
All files                         |    87.5 |    70.49 |   79.62 |   87.73 |                         
src                               |     100 |      100 |     100 |     100 |                         
App.tsx                           |     100 |      100 |     100 |     100 |                         
src/components/Calendar           |     100 |      100 |     100 |     100 |                         
Calendar.tsx                      |     100 |      100 |     100 |     100 |                         
src/components/CalendarEventForm  |      96 |      100 |   85.71 |      96 |                         
CalendarEventForm.tsx             |      96 |      100 |   85.71 |      96 | 29                      
src/components/Day                |     100 |       90 |     100 |     100 |                         
Day.tsx                           |     100 |       90 |     100 |     100 | 45                      
src/components/Header             |     100 |      100 |     100 |     100 |                         
Header.tsx                        |     100 |      100 |     100 |     100 |                         
src/components/MonthSelector      |      80 |      100 |      50 |      80 |                         
MonthSelector.tsx                 |      80 |      100 |      50 |      80 | 9,12                    
src/components/MonthView          |      96 |       50 |     100 |   95.83 |                         
MonthView.tsx                     |     100 |      100 |     100 |     100 |                         
MonthViewProvider.tsx             |     100 |      100 |     100 |     100 |                         
MonthViewWithTransition.tsx       |    92.3 |       50 |     100 |    92.3 | 33                      
src/context                       |    92.3 |    77.77 |      90 |    92.3 |                         
AppContextProvider.tsx            |   92.85 |      100 |   66.66 |   92.85 | 27                      
appReducer.tsx                    |   94.73 |      100 |     100 |   94.73 | 73                      
useAppContext.ts                  |   89.47 |       50 |     100 |   89.47 | 11,17                   
src/hooks/useDays                 |     100 |    33.33 |     100 |     100 |                         
useDays.ts                        |     100 |    33.33 |     100 |     100 | 8-14                    
src/mocks                         |     100 |      100 |     100 |     100 |                         
mockCalendarEvents.ts             |     100 |      100 |     100 |     100 |                         
render.tsx                        |     100 |      100 |     100 |     100 |                         
src/services                      |   21.73 |        0 |       0 |   22.72 |                         
events.ts                         |   21.73 |        0 |       0 |   22.72 | 11,16-18,23-31,37-43,50
src/ui/Button                     |     100 |      100 |     100 |     100 |                         
Button.tsx                        |     100 |      100 |     100 |     100 |                         
src/ui/Indicator                  |     100 |      100 |     100 |     100 |                         
Indicator.tsx                     |     100 |      100 |     100 |     100 |                         
src/ui/TextInput                  |     100 |      100 |     100 |     100 |                         
TextInput.tsx                     |     100 |      100 |     100 |     100 |                         
src/ui/icon                       |    92.3 |    88.88 |     100 |    92.3 |                         
Icon.tsx                          |    92.3 |    88.88 |     100 |    92.3 | 25                      
src/utils                         |     100 |    66.66 |     100 |     100 |                         
date.tsx                          |     100 |    66.66 |     100 |     100 | 3                       
----------------------------------|---------|----------|---------|---------|-------------------------
