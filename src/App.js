import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Weather from './Components/Weather.js';
import key from './secret.js';
import { Dimmer, Loader } from 'semantic-ui-react';
import bg from './assets/Wave.svg'
import bg2 from './assets/wave2.svg'


function App() {

  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [err, setErr] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      console.log("Latitude is:", lat)
      console.log("Longitude is:", long)

      await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`)
        .then(res => res.json())
        .then(result => {
          setData(result)
          console.log(result);
        })
        .catch(err => { setErr(err) });
    }
    fetchData();
  }, [lat, long]);


  return (
    <div className="App">

      {(typeof data.main != 'undefined') ? (
        < >
          
          <h1>Air Now</h1>
          <Weather weatherData={data} />
          <div  className="bg1" style={{ backgroundImage: `url(${bg})` , backgroundRepeat: 'no-repeat' }}></div>
          <div  className="bg2" style={{ backgroundImage: `url(${bg2})` , backgroundRepeat: 'no-repeat'}}></div>
        </>
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
}

export default App;
