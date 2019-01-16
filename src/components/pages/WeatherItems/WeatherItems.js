/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Col,
  Row,
  Button,
} from 'reactstrap';
import './WeatherItems.scss';
import weatherShape from '../../../helpers/propz/weatherShape';
import weatherRequests from '../../../helpers/data/weatherRequests';

class WeatherItems extends React.Component {
  static propTypes = {
    uid: PropTypes.string,
    singleWeatherLocation: weatherShape,
    deleteWeather: PropTypes.func,
    updateCurrentWeather: PropTypes.func,
    changeIsCurrentToTrue: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteWeather, singleWeatherLocation } = this.props;
    deleteWeather(singleWeatherLocation.id);
  }

  changeIsCurrentFalse = () => {
    const { updateCurrentWeather, uid } = this.props;
    weatherRequests.getWeather(uid).then((weatherArray) => {
      const currentWeather = weatherArray.filter(weatherObject => weatherObject.isCurrent === true);
      const weather = currentWeather[0];
      if (weather !== undefined) {
        const isCurrentFalse = false;
        const weatherId = weather.id;
        updateCurrentWeather(weatherId, isCurrentFalse);
      }
    });
  }

  updateIsCurrent = (e) => {
    const { updateCurrentWeather } = this.props;
    e.preventDefault();
    this.changeIsCurrentFalse();
    const isCurrentTrue = true;
    const weatherId = e.target.closest('.btn').id;
    updateCurrentWeather(weatherId, isCurrentTrue);
  }


  render() {
    const { singleWeatherLocation } = this.props;
    return (
      <div className='weather-items'>
        <Card>
          <Row>
            <Col xs='10'>
              <h4>{singleWeatherLocation.city}, {singleWeatherLocation.state}</h4>
            </Col>
            <Col xs='2'>
              <Button size="sm" color="danger" onClick={this.deleteEvent}><i className="fas fa-trash-alt"></i></Button>
              <Button size="sm" color="info" onClick={this.updateIsCurrent} id={singleWeatherLocation.id}><i className="fas fa-star-of-life"></i></Button>
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default WeatherItems;
