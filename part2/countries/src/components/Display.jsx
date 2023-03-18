import React from "react";
// Template to display country info
export function Display({ country }) {
    return (
        <>
            <h1> {country['name']['common']}</h1>
            <h3> area: {country['area'].toLocaleString()}</h3>
            <h3> Population: {country['population'].toLocaleString()}</h3>
            <h3>Languages:</h3>
            <ul>
                {
                    Object.values(country['languages']).map(x => (
                        <li key={Math.floor(Math.random() * 1999)}>{x}</li>
                    ))
                }
            </ul>

            <img style={{ 'width': '200px' }} alt={"flag"} src={country['flags']['svg']} />

            {(country['capital'] && <><h3>Weather in {country['capital'][0]}</h3> <i className={`wi wi-wmo4680-${country['code']}`}></i> <h3>Temp: {country['temp']} °F</h3><h3>Wind Speed: {country['wind']} m/s</h3></>) || <h3>No weather data</h3>}

        </>)
}