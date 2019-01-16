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
    currentWeatherId: '',
  }

  static propTypes = {
    uid: PropTypes.string,
  }

  componentDidMount() {
    weatherRequests.getWeather(this.props.uid).then((weather) => {
      this.setState({ weather });
      const currentWeather = weather.filter(weatherObject => weatherObject.isCurrent === true);
      if (Object.keys(currentWeather).length !== 0) {
        const currentWeatherId = currentWeather[0].id;
        this.setState({ currentWeatherId });
      }
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
          const currentWeather = weather.filter(weatherObject => weatherObject.isCurrent === true);
          const currentWeatherId = currentWeather[0].id;
          this.setState({ currentWeatherId });
          // }
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
    const { weather, currentWeatherId } = this.state;
    const { uid } = this.props;

    const weatherItemComponents = weather.map(weatherItem => (
      <WeatherItems
        uid={uid}
        key={weatherItem.id}
        singleWeatherLocation={weatherItem}
        deleteWeather={this.deleteOne}
        updateCurrentWeather={this.updateCurrentWeather}
        changeIsCurrentToTrue={this.changeIsCurrentToTrue}
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
            <WeatherCurrent uid={uid} currentWeatherId={currentWeatherId} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Weather;
