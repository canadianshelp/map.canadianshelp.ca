import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = 'pk.eyJ1IjoiZGFucGF6IiwiYSI6ImNrODNjdXo4NjFjN2EzbG5xdzl6YTZnZHQifQ.zPcJ5aimYUyAQvXUIdUsVw';

class Map extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      lng: -79.4,
      lat: 43.7,
      zoom: 10
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    map.on('load', () => {
      this.props.onMapLoaded(map);
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className='map__container' />
    )
  }
}

export default Map;
