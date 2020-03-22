import React from 'react';
import Sidebar from './Sidebar';
import Map from './Map';
import MapMarker from './MapMarker';
import MapSearch from './MapSearch';
import CsvParser from 'papaparse';
import './App.css';
import turfDistance from '@turf/distance';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      data: [],
      userLocation: null,
    };
  }

  componentDidMount() {
    CsvParser.parse(process.env.PUBLIC_URL + '/data.csv', {
      download: true,
      complete: (results) => {
        const data = results.data.map((row, idx) => {
          if (idx !== 0) { // skip header
            return {
              lat: row[3],
              lng: row[4],
              name: row[1],
              email: row[9],
              services: row[6]
            }
          } else {
            return null;
          }
        }).filter(v => v);
        this.setState({ data });
      }
    });
  }

  onMapLoaded = (map) => {
    this.setState({ map });
  }

  onGeocodeResult = (result) => {
    this.setState({
      userLocation: {
        lat: result.center[1],
        lng: result.center[0]
      }
    });

    const newData = (this.state.data || []).map((d) => {
      d.distance = turfDistance(result.center, [d.lng, d.lat], { units: 'kilometers' }).toFixed(1);
      return d;
    });

    this.setState({ data: newData });
  }

  onSidebarItemClick = (item) => {
    this.state.map.flyTo({
      center: [item.lng, item.lat],
      zoom: 15
    });
  }

  render() {
    const Markers = [];
    for (let [index, value] of this.state.data.entries()) {
      Markers.push(<MapMarker key={index} map={this.state.map} data={value} />);
    }

    return (
      <div className="App">
        <Map onMapLoaded={this.onMapLoaded} />
        <Sidebar data={this.state.data} onSidebarItemClick={this.onSidebarItemClick} />
        <MapSearch map={this.state.map} onGeocodeResult={this.onGeocodeResult} />
        { Markers }
      </div>
    );
  }
}

export default App;
