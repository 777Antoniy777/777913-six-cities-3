import React from 'react';
import PropTypes from "prop-types";
import leaflet from "leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = React.createRef();
    this.state = {
      map: null,
      city: [52.38333, 4.9],
      zoom: 12,
      icon: leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30],
      }),
      markersArr: [],
      cities: [],
    };
  }

  createMap() {
    const {city, zoom} = this.state;
    const mapRef = this.map.current;
    const voyager = leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    });

    const map = leaflet.map(mapRef, {
      // map state options
      center: city,
      zoom,
      marker: true,
      layers: voyager,
      // control options
      zoomControl: true,
    });
    map.setView(city, zoom);

    this.setState({
      map,
    }, this.getMarkersCoords);
  }

  getMarkersCoords() {
    const {offers} = this.props;
    console.log(offers);
    const {icon} = this.state;
    const markersArr = [];

    offers.forEach((elem) => {
      const marker = leaflet.marker(elem.coords, {icon});
      markersArr.push(marker);
    });

    this.addMarkersToMap(markersArr);

    // this.setState({
    //   markersArr: arr,
    // }, this.addMarkerstoMap);
  }

  addMarkersToMap(markersArr) {
    const {map} = this.state;
    const cities = leaflet.layerGroup(markersArr);

    if (map) {
      cities.addTo(map);
    }

    this.setState({
      cities,
    });
  }

  removeMarkersFromMap() {
    const {cities} = this.state;

    cities.clearLayers();
  }

  componentDidMount() {
    this.createMap();
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextState.cities !== this.state.cities || nextState.map !== this.state.map) {
  //     return false;
  //   }

  //   return true;
  // }

  componentDidUpdate() {
    // this.removeMarkersFromMap();
    // this.getMarkersCoords();
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
};

export default Map;
