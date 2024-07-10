## Create a simple application displaying the hotel rooms.

   ### Rules:

1. Create a public git repository e.g. on GitHub with brief info on how to run the application.
2. Use TypeScript and React.
3. You can use any framework, package or UI library of your choice if you want to.
4. Build it like a production-ready micro project, your selected technologies and
   architecture will matter.

### Application requirements:

1. App should fetch and display a list of hotel rooms from
   `process.env.REACT_APP_ROOMS_API` (GET)
2. Rooms should be sorted by price; User should be able to change the sorting. (by name,
   by price)
3. Rooms list should be paginated, display up to 4 elements on each page
4. App should have a possibility to check rooms avaiability (all at once, on demand or both
   methods). endpoint for the availability check:
   `${process.env.REACT_APP_ROOM_API}/${id}` (GET),
   e.g. `${process.env.REACT_APP_ROOM_API}/1`
5. Display the availability status for each room. That could be either "available",
   "onRequest", "soldout" or "error".
6. Display the price, currency and the difference after availability check (original vs. checked
   one).
7. Each room should have a “Book” button. It should be disabled when the selected room
   isn't available. On the click event log the selected room info to the browser console.


## Run guid

1. Run in project root dir `npm install` for required dependencies
2. For .env credentials, ask project owner, temple are in `.env.template`
3. Run `npm run start` for start app locally.
