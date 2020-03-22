import React from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

class MapSearch extends React.Component {
    constructor(props) {
        super(props);

        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        });

        geocoder.on('result', (result) => {
            if (result.result) {
                this.props.onGeocodeResult(result.result);
            }
        });

        this.state = {
            geocoder,
            initialized: false,
        };
    }

    render() {
        if (!this.props.map || this.state.initialized) return null;
        this.props.map.addControl(this.state.geocoder);
        this.setState({initialized: true});
        return null;
    }
}

export default MapSearch;
