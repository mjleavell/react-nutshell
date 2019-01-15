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

class WeatherItems extends React.Component {
  static propTypes = {
    singleWeatherLocation: weatherShape,
    deleteWeather: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteWeather, singleWeatherLocation } = this.props;
    deleteWeather(singleWeatherLocation.id);
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
            </Col>
          </Row>
        </Card>
      </div>
    );
  }
}

export default WeatherItems;
