import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFjb25ndXkiLCJhIjoiY2xmYmR0MmVkMHI3ZjN5bmd1Y3o2NjY2ciJ9.kketgg0Hmh7JiUqr55PSvg';
const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
    });
  });


  return (
    <div ref={mapContainer} className="map-container" />
  )
}

export default Map