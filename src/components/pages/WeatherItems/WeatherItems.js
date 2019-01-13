import React from 'react';
import { Card } from 'reactstrap';
import './WeatherItems.scss';
import weatherShape from '../../../helpers/propz/weatherShape';

class WeatherItems extends React.Component {
  static propTypes = {
    weather: weatherShape,
  }

  render() {
    const { weather } = this.props;
    return (
      <div className='weather-items'>
        <Card>
          <h4>{weather.city}, {weather.state}</h4>
        </Card>
      </div>
    );
  }
}

export default WeatherItems;
