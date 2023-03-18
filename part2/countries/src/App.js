
import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import { Display } from "./components/Display"
import 'weather-icons-npm/css/weather-icons.min.css'
const App = () => {
  // returned value from the API
  const [countries, setCountry] = useState(null)
  // value entered by user
  const [inputdata, setinputdata] = useState('')
  // to stop data render initially
  const rendered = useRef(false)

  // runs whenever inputdata state changes
  useEffect(() => {
    // async fucntion that gets data about a country based on user input
    async function dataGrabber() {
      let y = await axios.get(`https://restcountries.com/v3.1/name/${inputdata}`)
      return (y)
    }
    // if user types something and it's not the initial render
    if (inputdata && rendered.current) {
      dataGrabber()
        .then((res) => {
          //if the returned data is more than 10 countires then don't return anything
          if (res.data.length > 10) {
            setCountry(null)
            // otherwise if data is returned and it's less than 11
          } else if (res.status === 200) {
            // function to get weather data based on lat long
            async function weatherData({ capitalInfo }) {
              let wData
              let y = capitalInfo.latlng ? capitalInfo.latlng : null

              wData = y ? await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${y[0]}&longitude=${y[1]}&current_weather=true&temperature_unit=fahrenheit`) : null
              return wData
            }
            // loop through all the countries and returned only after grabbing weather data
            async function weaterMapper() {
              // copy assinge donly after all the promises are resolved or error
              let copy = await Promise.all(res.data.map(async (x) => {
                let ret;
                console.log(x, "xyx")
                // passes each country to the weather api and adds a temp property to each and a show value of false
                await weatherData(x)
                  .then((res) => {
                    x.temp = res ? res.data.current_weather.temperature : "unknown"
                    x.wind = res ? res.data.current_weather.windspeed : "unknown"
                    x.code = res ? res.data.current_weather.weathercode : "unknown"
                    x.show = false
                    ret = x
                  })
                  .catch(err => {
                    console.error(err);
                  })
                return (ret)
              }))
              //sets the country state with the modifed values
              setCountry(copy)
            }
            weaterMapper()
          }
        })
    }
    // if it is the initial render, the render state will be set to true so it won't go fetching on initial render
    else { rendered.current = true }
  }, [inputdata])

  // sets the inputdata state based on the value from the input
  function inputHandler(e) {
    setinputdata(e.target.value)

  }
  // if key (area) matches toggle the switch value and set the state based on the new returned value
  function clickHandler(xx) {
    let ans = countries.map(j => {
      if (j.area === xx.area) {
        j.show = !j.show
        return (j)
      }
      return (j)

    })
    setCountry(ans)
  }
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>

        <label htmlFor={'country'}>find countries</label>
        <input onChange={inputHandler} value={inputdata} type='text' name="country" />
      </form>
      <>
        {/* only a single country match */}
        {countries ? (
          countries.length === 1 ? <Display country={countries[0]} /> : (countries.length < 10 ?
            /* if less than 10 match */
            (countries.map(x => {
              return (
                // use area as a key
                <div key={x.area} ><h3 style={{ display: 'inline' }}>{x.name.common}</h3> <button onClick={() => clickHandler(x)}>{x.show ? 'hide' : 'show'}</button>
                  {/* if show state is true it will be displayed otherwise it won't */}
                  <div style={{ "display": (x.show ? "block" : "none") }} >
                    <Display country={x} />
                  </div>
                </div>
              )
            })) : '')) : (
          // if length of return data is more than 10 countries and someone already put a value in input
          inputdata ? <h1>Too many countries</h1> : ''
        )
        }
      </>
    </div >
  )
}
export default App

