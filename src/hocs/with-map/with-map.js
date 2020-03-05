import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

const withMap = (Component) => {
  class WithMap extends React.Component {
    constructor(props) {
      super(props);
      this.map = React.createRef();
      this.state = {
        map: null,
        center: [52.38333, 4.9],
        cities: [],
      };
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
        this.getMarkers();
      }
    }

    componentWillUnmount() {
      const {map} = this.state;

      map.remove();
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
      }, this.getMarkers);
    }

    createMarker(url, coords) {
      const icon = leaflet.icon({
        iconUrl: url,
        iconSize: [30, 30],
      });

      const marker = leaflet.marker(coords, {icon});

      return marker;
    }

    getMarkers() {
      const {offers, activeCoords, hoveredCoords} = this.props;
      const markersArr = [];
      let marker;

      offers.forEach((elem) => {
        marker = this.createMarker(`img/pin.svg`, elem.coords);

        if (activeCoords) {
          if (elem.coords === activeCoords) {
            marker = this.createMarker(`img/pin-active.svg`, activeCoords);
          }
        }

        if (hoveredCoords) {
          if (elem.coords === hoveredCoords) {
            marker = this.createMarker(`img/pin-active.svg`, hoveredCoords);
          }
        }

        markersArr.push(marker);
      });

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

    render() {
      return (
        <Component
          {...this.props}
          map={this.map}
        />
      );
    }
  }

  return WithMap;
};

export default withMap;
