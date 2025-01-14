import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  let [city, setCity]=useState('');
  let [wDetails, setWdetails]=useState();
  let [loading, setLoading]=useState(false);

  let getData=(event)=>{
    event.preventDefault();
    if (city.trim() === ""){
      toast.warn("Please Enter the City Name!", {autoClose:2000})
      return;
    }
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=118640b3a54beae16e8b3b5b5991332a`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if (finalRes.cod=="404"){
        setWdetails(undefined);
      }
      else {
        setWdetails(finalRes);
      }
    })
    .finally(()=>{
      setLoading(false);
    })
    setCity('');
  }
  return (
    <div className='container'>
      <h1>MeteoMausam</h1>

      <form className='city-input' onSubmit={getData}>
        <input type='text' value={city} onChange={(event)=>setCity(event.target.value)} placeholder='Enter your City Name'/>
        <button>Submit</button>
      </form>

      <div className='weather-box'>
        {
          loading
          ?
          <img src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif'></img>
          :
          wDetails!==undefined
          ?
          <>
            <div className='city-name'>
              <h3>{wDetails.name}</h3>
              <span>{wDetails.sys.country}</span>
            </div>

            <p className='temp'>{(wDetails.main.temp-273.15).toFixed(0)}°C</p>

            <div className='weather'>
              <img src={`https://openweathermap.org/img/wn/${wDetails.weather[0].icon}@2x.png`}/>
              <p>{wDetails.weather[0].description}</p>
            </div>
          </>
          :
          "No Data"
        }
      </div>
      <ToastContainer/>
    </div>
  );
}

export default App;



