import axios from "axios";
import { useEffect, useState } from "react";

const CountryDisplay = ({ country }) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (country && country.length > 0) {
      axios
        .get(
          `https://api.open-meteo.com/v1/forecast?latitude=${country.capitalInfo.latlng[0]}&longitude=${country.capitalInfo.latlng[1]}&current=temperature_2m,precipitation,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
        )
        .then((response) => setWeather(response.data.current))
        .catch((error) => console.log(error));
    }
  }, [country]);

  if (!country || country.length === 0) {
    return null;
  }

  return (
    <div>
      <h2>
        {country.name.common} {country.flag}
      </h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <p onClick={() => console.log(country.languages)}>languages:</p>
      <ul>
        {Object.keys(country.languages).map((lang) => {
          return <li>{country.languages[lang]}</li>;
        })}
      </ul>

      <h3>weather</h3>
      <p>current temperature: {weather.temperature_2m} deg f</p>
      <p>precipitation: {weather.precipitation}in</p>
      <p>wind speed: {weather.wind_speed_10m}mph</p>
      <p>wind direction: {weather.wind_direction_10m}</p>
    </div>
  );
};

const Countries = () => {
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState([]);

  useEffect(() => {
    if (searchText !== "") {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${searchText}`
        )
        .then((response) => setCountry(response.data))
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchText]);

  return (
    <div>
      <h1>countries</h1>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div onClick={() => console.log(country)}>log</div>
      <CountryDisplay country={country} />
    </div>
  );
};

export default Countries;
