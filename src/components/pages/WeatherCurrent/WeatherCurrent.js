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
import weatherRequests from '../../../helpers/data/weatherRequests';
import weatherbitRequests from '../../../helpers/data/weatherbitRequests';
import './WeatherCurrent.scss';

class WeatherCurrent extends React.Component {
  state = {
    isCurrent: {},
    currentWeather: {},
  }

  static propTypes = {
    uid: PropTypes.string,
  }

  componentDidMount() {
    weatherRequests.getIsCurrent(this.props.uid)
      .then((isCurrent) => {
        if (isCurrent !== undefined) {
          this.getCurrentWeather(isCurrent.city, isCurrent.state);
          this.setState({ isCurrent });
        }
      })
      .catch(err => console.error('error with current weather GET', err));
  }

  getCurrentWeather = (currentCity, currentState) => {
    weatherbitRequests.getForecast(currentCity, currentState)
      .then((weatherData) => {
        this.setState({
          currentWeather: {
            icon: weatherData.weather.icon,
            description: weatherData.weather.description,
            city: weatherData.city_name,
            state: weatherData.state_code,
            windSpeed: weatherData.wind_spd,
            windDirection: weatherData.wind_cdir,
            temp: weatherData.temp,
          },
        });
      })
      .catch(err => console.error('error with current weather GET', err));
  }

  render() {
    const { currentWeather } = this.state;

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
