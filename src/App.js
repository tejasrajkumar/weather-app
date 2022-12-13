import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "./App.css";

const WeatherIcons = {
  "01d": "/icons/sunny.svg",
  "01n": "/icons/night.svg",
  "02d": "/icons/day.svg",
  "02n": "/icons/cloudy-night.svg",
  "03d": "/icons/cloudy.svg",
  "03n": "/icons/cloudy.svg",
  "04d": "/icons/perfect-day.svg",
  "04n": "/icons/cloudy-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain-night.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/storm.svg",
  "11n": "/icons/storm.svg",
  "50d": "/icons/haze.png",
};

export const WeatherInfoIcons = {
  sunset: "/icons/temp.svg",
  sunrise: "/icons/temp.svg",
  humidity: "/icons/humidity.svg",
  wind: "/icons/wind.svg",
  pressure: "/icons/pressure.svg",
};

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  color: #0a1f44;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const InfoComponent = (props) => {
  const { name, value } = props;
  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]} />
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState();
  const isDay = () => weather?.icon?.includes("d");

  const search = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=fe4feefa8543e06d4f3c66d92c61b69c`
      );
      if (response?.data) {
        setWeather(response.data);
      }
    }
  };

  const getTime = (timeStamp) => {
    return `${new Date(timeStamp * 1000).getHours()} : ${new Date(
      timeStamp * 1000
    ).getMinutes()}`;
  };

  return (
    <div className="main-container">
      <div className="logoInfo">
        <div className="flex">
          <img
            src="https://i.pinimg.com/originals/06/c4/f7/06c4f70ec5931e2342e703e8a3f0a253.png"
            alt="logo"
            width="100px"
            height="100px"
            style={{ borderRadius: "100px" }}
          />
          <p className="logoText">Weather App</p>
        </div>
      </div>
      <div className="inputContainer">
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
      </div>
      {weather ? (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.floor(weather?.main?.temp - 273)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            {WeatherIcons[weather?.weather[0]?.icon] ? (
              <WeatherIcon src={WeatherIcons[weather?.weather[0]?.icon]} />
            ) : null}
            <p>{weather.weather[0].description}</p>
          </div>

          <Container>
            <InfoComponent
              name={isDay() ? "sunset" : "sunrise"}
              value={`${getTime(weather?.sys[isDay() ? "sunset" : "sunrise"])}`}
            />
            <InfoComponent name={"humidity"} value={weather?.main?.humidity} />
            <InfoComponent name={"wind"} value={weather?.wind?.speed} />
            <InfoComponent name={"pressure"} value={weather?.main?.pressure} />
          </Container>
        </div>
      ) : null}
    </div>
  );
};

export default App;
