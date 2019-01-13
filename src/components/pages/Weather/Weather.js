import React from 'react';
import WeatherItems from '../WeatherItems/WeatherItems';
import weatherRequests from '../../../helpers/data/weatherRequests';
import './Weather.scss';

class Weather extends React.Component {
  state = {
    weather: [],
  }

  componentDidMount() {
    weatherRequests.getWeather(localStorage.getItem('uid'))
      .then((weather) => {
        this.setState({ weather });
      })
      .catch(err => console.error('error with weather GET', err));
  }

  render() {
    const { weather } = this.state;

    const weatherItemComponents = weather.map(weatherItem => (
      <WeatherItems
        weather={weatherItem}
        key={weatherItem.id}
      />
    ));

    return (
      <div className='weather'>
        <div id='weather-items'>
          {weatherItemComponents}
        </div>
      </div>
    );
  }
}

export default Weather;
