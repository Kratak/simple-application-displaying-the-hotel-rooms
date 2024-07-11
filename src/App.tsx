import React from 'react';
import './App.css';
import useApi from "./useApi";

function App() {
  const { displayedRooms } = useApi();

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
                        <button>check availability</button> Status: {room.availability}
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
