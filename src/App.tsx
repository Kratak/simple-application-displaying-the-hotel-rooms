import React from 'react';
import './App.css';
import useApi from "./useApi";

function App() {
  const { displayedRooms, getRoomAvailability } = useApi();

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Available  rooms:
        </p>
      </header>
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
    </div>
  );
}

export default App;
