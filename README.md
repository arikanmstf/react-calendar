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
* 

### Automation
* When pushed to master; runs tests and if tests passed, builds and deploys to GitHub pages
* Using GitHub actions, see `build.yml`

### Technical Discussion
* Full client-side rendering, powered by create-react-app
* No any 3rd party date-time libraries used, such as momentJs etc. Only ES built in Date api.
* 

#### State management
* No any 3rd party state manager libraries used. React's Context Api with reducers was very much enough.
* Using React's reducers and actions. App keeps the state at the context provider and only gets updated by dispatch function.
See `appReducer.tsx` `useAppContext.ts` and `AppContextProvider.tsx`.
* 


#### How animation works?
* Even tho, user is seeing one month at a time, in fact there are 3 months getting rendered every time.
So they are next and previous months. App always keeps three months in the state and according to this state renders these month views.
When user interacts with the button, say to the next month; while pre-rendered next month is moving into the view port,
app is updating the state with the new middle-month. And before transition completed new months getting to their place.
