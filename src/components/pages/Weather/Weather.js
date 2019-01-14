/* eslint-disable max-len */
import React from 'react';
// import { isEmpty } from 'firebase/app';
import {
  Col,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import WeatherItems from '../WeatherItems/WeatherItems';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import weatherRequests from '../../../helpers/data/weatherRequests';
import weatherbitRequests from '../../../helpers/data/weatherbitRequests';
import './Weather.scss';

class Weather extends React.Component {
  state = {
    weather: [],
    isCurrent: {},
    weatherData: {},
    weatherObject: {},
  }

  static propTypes = {
    uid: PropTypes.string,
  }

  componentDidMount() {
    weatherRequests.getWeather(this.props.uid)
      .then((weather) => {
        this.setState({ weather });
      })
      .catch(err => console.error('error with weather GET', err));

    weatherRequests.getIsCurrent(this.props.uid)
      .then((isCurrent) => {
        // if i dont have the if statement, i get errors bc isCurrent.id and isCurrent.city are undefined
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
        this.setState({ weatherObject: weatherData.weather });
        this.setState({ weatherData });
      })
      .catch(err => console.error('error with current weather GET', err));
  }

  render() {
    const {
      weather,
      isCurrent,
      weatherData,
      weatherObject,
    } = this.state;

    const weatherItemComponents = weather.map(weatherItem => (
      <WeatherItems
        weather={weatherItem}
        key={weatherItem.id}
      />
    ));

    return (
      <div className='weather container'>
        <Row>
          <Col>
            {weatherItemComponents}
          </Col>
          <Col>
            <WeatherCurrent
              key={isCurrent.id}
              isCurrent={isCurrent}
              weatherData={weatherData}
              weatherObject={weatherObject}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Weather;
