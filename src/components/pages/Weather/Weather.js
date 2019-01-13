import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import WeatherItems from '../WeatherItems/WeatherItems';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import weatherRequests from '../../../helpers/data/weatherRequests';
import weatherbitRequests from '../../../helpers/data/weatherbitRequests';
import './Weather.scss';

class Weather extends React.Component {
  state = {
    weather: [],
    isCurrent: {},
  }

  componentDidMount() {
    weatherRequests.getWeather(localStorage.getItem('uid'))
      .then((weather) => {
        this.setState({ weather });
      })
      .catch(err => console.error('error with weather GET', err));

    this.getCurrentWeather();
  }

  getCurrentWeather = () => {
    weatherRequests.getIsCurrent(localStorage.getItem('uid'))
      .then((isCurrent) => {
        this.setState({ isCurrent });
        weatherbitRequests.getForecast(isCurrent.city, isCurrent.state)
          .then((weatherData) => {
            console.log(weatherData);
            this.setState({ weatherData });
          });
      })
      .catch(err => console.error('error with current weather GET', err));
  }

  render() {
    const { weather, isCurrent, weatherData } = this.state;

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
              getCurrentWeather={this.getCurrentWeather}
              weatherData={weatherData}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Weather;
