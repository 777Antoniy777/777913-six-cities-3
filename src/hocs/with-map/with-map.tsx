import * as React from "react";
import {Subtract} from "utility-types";
import * as leaflet from "leaflet";

type Cities = {
  clearLayers: () => void;
};

type Map = {
  remove: () => void;
  setView: (center: number[], zoom: number) => void;
};

interface State {
  map: null | Map;
  cities: null | Cities;
}

interface InjectingProps {
  map: React.RefObject<HTMLDivElement>;
}

const withMap = (Component) => {
  type Props = React.ComponentProps<typeof Component>;
  type RestProps = Subtract<Props, InjectingProps>;

  class WithMap extends React.Component<RestProps, State> {
    private map: React.RefObject<HTMLDivElement>;

    constructor(props) {
      super(props);
      this.map = React.createRef();
      this.state = {
        map: null,
        cities: null,
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

      if (cities) {
        this.updateMapCenter();
        this.removeMarkersFromMap();
        this.getMarkers();
      }
    }

    componentWillUnmount() {
      const {map} = this.state;

      if (!map) {
        return false;
      }

      map.remove();

      return true;
    }

    createMap() {
      const {offers} = this.props;

      if (!offers[0]) {
        return false;
      }

      console.log(leaflet)
      const {location} = offers[0].city;
      const {latitude, longitude, zoom} = location;
      const center = [latitude, longitude];
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

      return true;
    }

    updateMapCenter() {
      const {offers} = this.props;
      const {map} = this.state;
      const {location} = offers[0].city;
      const {latitude, longitude, zoom} = location;
      const center = [latitude, longitude];

      map.setView(center, zoom);
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
      const {offers, activelocation, hoveredLocation} = this.props;
      const markersArr = [];
      let marker;

      offers.forEach((elem) => {
        const location = elem.location;
        marker = this.createMarker(`/img/pin.svg`, [location.latitude, location.longitude]);

        if (activelocation) {
          if (location === activelocation) {
            marker = this.createMarker(`/img/pin-active.svg`, [activelocation.latitude, activelocation.longitude]);
          }
        }

        if (hoveredLocation) {
          if (location === hoveredLocation) {
            marker = this.createMarker(`/img/pin-active.svg`, [hoveredLocation.latitude, hoveredLocation.longitude]);
          }
        }

        markersArr.push(marker);
      });

      this.addMarkersToMap(markersArr);

      return true;
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
