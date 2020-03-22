import React from 'react';
import mapboxgl from 'mapbox-gl';

class MapMarker extends React.Component {
    render() {
        if (!this.props.map || !this.props.data) return null;

        const {
            name,
            email,
            services,
            lng,
            lat
        } = this.props.data;

        // create the popup
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div>${name}</div><div>${email}</div><div>${services || ''}</div>`
        );

        // create DOM element for the marker
        const el = document.createElement('div');
        el.id = 'marker';

        new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(this.props.map);

        return null;
    }
}

export default MapMarker;
