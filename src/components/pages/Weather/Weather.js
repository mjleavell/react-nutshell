import React from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import PropTypes from 'prop-types';
import WeatherCurrent from '../WeatherCurrent/WeatherCurrent';
import WeatherItems from '../WeatherItems/WeatherItems';
import weatherRequests from '../../../helpers/data/weatherRequests';
import './Weather.scss';
import WeatherForm from '../WeatherForm/WeatherForm';

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

  deleteOne = (weatherId) => {
    weatherRequests.deleteWeather(weatherId).then(() => {
      weatherRequests.getWeather(this.props.uid)
        .then((weather) => {
          this.setState({ weather });
        });
    })
      .catch(err => console.error('error with delete single', err));
  }

  updateCurrentWeather = (weatherId, isCurrentBool) => {
    weatherRequests.patchIsCurrent(weatherId, isCurrentBool).then(() => {
      weatherRequests.getWeather(this.props.uid)
        .then((weather) => {
          this.setState({ weather });
        });
    })
      .catch(err => console.error('error with update is current', err));
  }


  formSubmitEvent = (newWeather) => {
    weatherRequests.postRequest(newWeather).then(() => {
      weatherRequests.getWeather(this.props.uid)
        .then((weather) => {
          this.setState({ weather });
        });
    })
      .catch(err => console.error('error with weather post', err));
  }

  render() {
    const { weather } = this.state;
    const { uid } = this.props;

    const weatherItemComponents = weather.map(weatherItem => (
      <WeatherItems
        key={weatherItem.id}
        singleWeatherLocation={weatherItem}
        deleteWeather={this.deleteOne}
        updateCurrentWeather={this.updateCurrentWeather}
      />
    ));

    return (
      <div className='weather container'>
        <Row>
          <Col>
            <WeatherForm onSubmit={this.formSubmitEvent} />
          </Col>
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
