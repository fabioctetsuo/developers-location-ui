import React, { Component } from 'react';
import MapGL, { Marker } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionCreators as ModalActions } from '../../store/ducks/modal';

import 'mapbox-gl/dist/mapbox-gl.css';
import './styles.css';

class Map extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    users: PropTypes.arrayOf().isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: -23.664273,
        longitude: -46.539883,
        zoom: 14,
      },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { viewport } = this.state;
    this.setState({
      viewport: {
        ...viewport,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    });
  };

  handleMapClick = async (e) => {
    const [longitude, latitude] = e.lngLat;
    const { showModal } = this.props;
    await showModal({ latitude, longitude });
  };

  render() {
    const { viewport } = this.state;
    const { users } = this.props;
    return (
      <MapGL
        {...viewport}
        onClick={this.handleMapClick}
        mapStyle="mapbox://styles/mapbox/basic-v9"
        mapboxApiAccessToken="pk.eyJ1IjoiZGllZ28zZyIsImEiOiJjamh0aHc4em0wZHdvM2tyc3hqbzNvanhrIn0.3HWnXHy_RCi35opzKo8sHQ"
        onViewportChange={viewportTeste => this.setState({ viewport: viewportTeste })}
      >
        {!!users.data.length
          && users.data.map(user => (
            <Marker
              latitude={user.cordinates.latitude}
              longitude={user.cordinates.longitude}
              onClick={this.handleMapClick}
              captureClick
              key={user.id}
            >
              <img
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48,
                }}
                className="avatar-map-photo"
                alt={user.name}
                src={user.avatar}
              />
            </Marker>
          ))}
      </MapGL>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users,
});

const mapDispatchToProps = dispatch => bindActionCreators(ModalActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Map);
