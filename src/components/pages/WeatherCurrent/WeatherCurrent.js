import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
} from 'reactstrap';
import './WeatherCurrent.scss';

class WeatherCurrent extends React.Component {
  static propTypes = {
    isCurrent: PropTypes.object,
    weatherData: PropTypes.object,
  }

  render() {
    const { isCurrent, weatherData } = this.props;
    return (
      <div className='weather-current'>
        <h4>weather current</h4>
        <Card>
          <CardImg top width="80%" src='' alt='' />
          <CardBody>
            <CardTitle></CardTitle>
            <CardText></CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default WeatherCurrent;
