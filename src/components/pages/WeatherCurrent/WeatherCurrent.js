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
    weatherObject: PropTypes.object,
  }

  render() {
    const { weatherData, weatherObject } = this.props;
    if (Object.keys(weatherData).length === 0) {
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
          <CardHeader tag="h3">{weatherData.city_name}, {weatherData.state_code}</CardHeader>
          <CardImg top width="80%" src={`https://www.weatherbit.io/static/img/icons/${weatherObject.icon}.png`} alt={weatherObject.description} />
          <CardBody text="center">
            <CardTitle>{weatherData.temp}°F</CardTitle>
            <CardText>{weatherData.wind_cdir} {weatherData.wind_spd} mph</CardText>
            <CardText>{weatherObject.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default WeatherCurrent;
