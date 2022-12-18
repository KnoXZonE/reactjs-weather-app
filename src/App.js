import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3f4825a79c520ce4fdb80c3cde0292b6`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
        />
      </div>
      <div className="wrapper">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <p>{data.main.temp.toFixed()}°F</p> : null}
          </div>

          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}</p> : null}
              <p>Feels Like</p>
            </div>

            <div className="humidity">
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
              <p>Humidity</p>
            </div>

            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()}MPH</p> : null}
              <p>Winds</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
