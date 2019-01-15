import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Col,
  Row,
  Button,
} from 'reactstrap';
import authRequests from '../../../helpers/data/authRequests';
import './WeatherForm.scss';

const defaultWeather = {
  city: '',
  isCurrent: false,
  state: '',
  uid: '',
};

class WeatherForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  state = {
    newWeather: defaultWeather,
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempWeather = { ...this.state.newWeather };
    tempWeather[name] = e.target.value;
    this.setState({ newWeather: tempWeather });
  }

  cityChange = e => this.formFieldStringState('city', e);

  stateChange = e => this.formFieldStringState('state', e);

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const newWeather = { ...this.state.newWeather };
    newWeather.uid = authRequests.getCurrentUid();
    onSubmit(newWeather);
    this.setState({ newWeather: defaultWeather });
  }

  render() {
    const { newWeather } = this.state;

    return (
      <div className='weather-form'>
        <h4 id="form-title">Add new location</h4>
        <form onSubmit={this.formSubmit}>
          <Input
            type="text"
            id="city"
            placeholder="City"
            value={newWeather.city}
            onChange={this.cityChange}
          />
          <Row>
            <Col xs="9">
              <Input type="select" id="state" onChange={this.stateChange}>
                <option>AL</option>
                <option>AK</option>
                <option>AZ</option>
                <option>AR</option>
                <option>CA</option>
                <option>CO</option>
                <option>CT</option>
                <option>DE</option>
                <option>FL</option>
                <option>GA</option>
                <option>HI</option>
                <option>ID</option>
                <option>IL</option>
                <option>IN</option>
                <option>IA</option>
                <option>KS</option>
                <option>KY</option>
                <option>LA</option>
                <option>ME</option>
                <option>MD</option>
                <option>MA</option>
                <option>MI</option>
                <option>MN</option>
                <option>MS</option>
                <option>MO</option>
                <option>MT</option>
                <option>NE</option>
                <option>NV</option>
                <option>NH</option>
                <option>NJ</option>
                <option>NM</option>
                <option>NY</option>
                <option>NC</option>
                <option>ND</option>
                <option>OH</option>
                <option>OK</option>
                <option>PA</option>
                <option>RI</option>
                <option>SC</option>
                <option>SD</option>
                <option>TN</option>
                <option>TX</option>
                <option>UT</option>
                <option>VT</option>
                <option>VA</option>
                <option>WA</option>
                <option>WV</option>
                <option>WI</option>
                <option>WY</option>
              </Input>
            </Col>
            <Col xs="2">
              <Button color="secondary" id="form-btn" type="submit"><i className="fas fa-plus"></i></Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default WeatherForm;
