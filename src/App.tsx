import React from 'react';
import './App.css';
import useApi from "./useApi";

function App() {
  const {
    displayedRooms,
    getRoomAvailability,
    displayedRoomsPage,
    handleChangePage,
    handleRoomSortToggle,
      roomsSort,
    isNextPageButtonDisable,
      isPrevPageButtonDisable
  } = useApi();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Available  rooms:
        </p>
      </header>
        <br/>
        <div>
            <button onClick={handleRoomSortToggle()}>{`Sorted by ${roomsSort === 'DESC' ? "highest ↑": "lowest ↓"} price`}</button>
        </div>
        <br/>
        <div>
          {displayedRooms.map(room => {
            return(
                <div key={room.id}>
                  <div>{room.name}</div>
                  <div>Price: {new Intl.NumberFormat('pl', { style: 'currency', currency: room.price.currencyCode  }).format(
                      room.price.value / 100,
                  )}
                  </div>
                    <div>
                        <button onClick={() => getRoomAvailability(room.id)}>check availability</button> Status: {room.availabilityStatus}
                    </div>
                  <div>
                    <button disabled={room.availabilityStatus !== 'available'} onClick={() => console.log('room booked')}>book</button>
                  </div>
                    <br/>
                </div>
            )
          })}
        </div>
      <div>
        <button disabled={isPrevPageButtonDisable} onClick={handleChangePage('prev')}>Previous page</button>
          {displayedRoomsPage}
        <button disabled={isNextPageButtonDisable} onClick={handleChangePage('next')}>Next page</button>
      </div>
    </div>
  );
}

export default App;
