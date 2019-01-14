import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import WeatherItems from '../WeatherItems/WeatherItems';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import weatherRequests from '../../../helpers/data/weatherRequests';
import './Weather.scss';

class Weather extends React.Component {
  state = {
    weather: [],
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
  }

  render() {
    const { weather } = this.state;
    const { uid } = this.props;

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
            <WeatherCurrent uid={uid} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Weather;
