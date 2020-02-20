import React from 'react';
import PropTypes from "prop-types";
import leaflet from "leaflet";

class Map extends React.PureComponent {
  constructor() {
    super();
    this.map = React.createRef();
    this.state = {
      map: null,
      city: [52.38333, 4.9],
      zoom: 12,
      icon: leaflet.icon({
        iconUrl: `img/pin.svg`,
        iconSize: [30, 30],
      }),
      offerCords: [52.3709553943508, 4.89309666406198],
    };
  }

  getMapCoords(centerCity, icon) {
    const {offers} = this.props;
    const arr = [];

    offers.forEach((elem) => {
      const coord = leaflet.marker(elem.coords, {icon});
      arr.push(coord);
    });

    if (centerCity) {
      arr.push(centerCity);
    }

    return arr;
  }

  setMapOptions() {
    const {city, zoom, icon, offerCords} = this.state;
    const openStreenMap = leaflet.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}`, {
      foo: `bar`,
      attribution: `Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>`
    });
    const voyager = leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    });

    const center = leaflet.marker(offerCords, {icon})
                          .bindPopup(`Amsterdam`);
    const mapCoords = this.getMapCoords(center, icon);
    const cities = leaflet.layerGroup(mapCoords);

    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: true,
      marker: true,
      layers: [voyager, cities],
    }).setView(city, zoom);

    this.setState({
      map,
    });

    const baseMaps = {
      "Voyager": voyager,
      "Open Streen Map": openStreenMap
    };

    const overlayMaps = {
      "Cities": cities,
    };

    leaflet.control.layers(baseMaps, overlayMaps).addTo(map);
  }

  componentDidMount() {
    this.setMapOptions();
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
  offers: PropTypes.arrayOf(
      PropTypes.object
  ),
};

export default Map;
