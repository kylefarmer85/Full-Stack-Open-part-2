import React from 'react';

const Country = ({ name, capital, population, languages, flag }) => (
  <div>
    <h1>{name}</h1>
    <p>
      Capital: {capital}
      <br />
      Population: {population}
    </p>

    <h2>Languages</h2>
    <ul>
      {languages &&
        languages.map(language => <li key={language.name}>{language.name}</li>)}
    </ul>
    <img src={flag} style={{ width: '15%' }} alt='flag' />
  </div>
);

export default Country;
