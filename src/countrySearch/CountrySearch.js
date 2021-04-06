import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country';
import Weather from './Weather';

const api_key = process.env.REACT_APP_API_KEY;

const CountrySearch = () => {
  const [countries, setCountries] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [oneCountry, setOneCountry] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get('https://restcountries.eu/rest/v2/all')
      setCountries(data)
    }
    fetch()
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${oneCountry.name}`)
      setWeather(data)
    }
    fetch()
  }, [oneCountry]);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://api.weatherstack.com/current?access_key=${api_key}&query=${oneCountry.name}`
  //     )
  //     .then(response => {
  //       setWeather(response.data);
  //       console.log(response.data);
  //     });
  // }, [oneCountry]);

  const handleChange = e => {
    setUserInput(e.target.value);

    if (e.target.value.length === 0) {
      setOneCountry('');
    }
  };

  const handleClick = country => {
    setOneCountry(country);
  };

  const filterCountries = () => {
    const filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().includes(userInput.toLowerCase());
    });

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
      return filteredCountries.map(country => {
        return (
          <>
            <li key={country.name}>{country.name}</li>
            <button onClick={() => handleClick(country)}>show</button>
          </>
        );
      });
    } else if (filteredCountries.length === 1) {
      setOneCountry(filteredCountries[0]);
    }
  };

  return (
    <div>
      Find countries
      <input value={userInput} onChange={handleChange} />
      {oneCountry ? (
        <>
          <Country {...oneCountry} /> <Weather {...weather.current} />
        </>
      ) : (
        <ul>{filterCountries()}</ul>
      )}
    </div>
  );
};

export default CountrySearch;
