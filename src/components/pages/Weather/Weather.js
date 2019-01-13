import React from 'react';
import PropTypes from 'prop-types';
import weatherShape from '../../../helpers/propz/weatherShape';
import './Weather.scss';
import WeatherItems from '../WeatherItems/WeatherItems';

class Weather extends React.Component {
  static propTypes = {
    weather: PropTypes.arrayOf(weatherShape),
  }

  render() {
    const { weather } = this.props;

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
