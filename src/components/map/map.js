import React from 'react';
import PropTypes from "prop-types";
import leaflet from "leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      map: null,
      center: [52.38333, 4.9],
      cities: [],
    };
  }

  createMap() {
    const {center} = this.state;
    const zoom = 12;
    const mapRef = this.map.current;
    const voyager = leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    });

    const map = leaflet.map(mapRef, {
      // map state options
      center,
      zoom,
      marker: true,
      layers: voyager,
      // control options
      zoomControl: true,
    });
    map.setView(center, zoom);

    this.setState({
      map,
    }, this.getMarkersCoords);
  }

  getMarkersCoords() {
    const {offers, activeCoords} = this.props;
    const markersArr = [];
    let icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30],
    });

    offers.forEach((elem) => {
      const marker = leaflet.marker(elem.coords, {icon});
      markersArr.push(marker);
    });

    if (activeCoords) {
      icon = leaflet.icon({
        iconUrl: `img/pin-active.svg`,
        iconSize: [30, 30],
      });
      const marker = leaflet.marker(activeCoords, {icon});
      markersArr.push(marker);
    }

    this.addMarkersToMap(markersArr);
  }

  addMarkersToMap(markersArr) {
    const {map} = this.state;
    const cities = leaflet.layerGroup(markersArr);
    cities.addTo(map);

    this.setState({
      cities,
    });
  }

  removeMarkersFromMap() {
    const {cities} = this.state;

    cities.clearLayers();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.cities !== nextState.cities) {
      return false;
    }

    return true;
  }

  componentDidMount() {
    if (this.map.current) {
      this.createMap();
    }
  }

  componentDidUpdate() {
    const {cities} = this.state;

    if (cities.length !== 0) {
      this.removeMarkersFromMap();
      this.getMarkersCoords();
    }
  }

  componentWillUnmount() {
    const {map} = this.state;

    map.remove();
  }

  render() {
    return (
      <div id="map" style={{height: `100%`}} ref={this.map}></div>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.object),
  activeCoords: PropTypes.arrayOf(PropTypes.number),
};

export default Map;
