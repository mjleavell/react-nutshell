import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardHeader,
  CardTitle,
} from 'reactstrap';
import './WeatherCurrent.scss';

class WeatherCurrent extends React.Component {
  static propTypes = {
    isCurrent: PropTypes.object,
    weatherData: PropTypes.object,
    currentWeather: PropTypes.object,
  }

  render() {
    const { weatherData, currentWeather } = this.props;
    if (Object.keys(currentWeather).length === 0) {
      return (
        <div className='weather-current'>
          <Card>
            <CardHeader className="text-danger" tag="h3">Select location</CardHeader>
            <CardBody text="center">
              <CardTitle tag="h4" className="text-danger my-3"><i className="fas fa-exclamation fa-3x"></i></CardTitle>
            </CardBody>
          </Card>
        </div>
      );
    }
    return (
      <div className='weather-current'>
        <Card>
          <CardHeader tag="h3">{currentWeather.city}, {currentWeather.state}</CardHeader>
          <CardImg top width="80%" src={`https://www.weatherbit.io/static/img/icons/${currentWeather.icon}.png`} alt={currentWeather.description} />
          <CardBody text="center">
            <CardTitle>{currentWeather.temp}°F</CardTitle>
            <CardText>{currentWeather.windDirection} {currentWeather.windSpeed} mph</CardText>
            <CardText>{currentWeather.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default WeatherCurrent;
