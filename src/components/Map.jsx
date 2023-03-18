import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl';
import { toast } from 'react-hot-toast';
import useAppStore from '../zustand/appStore';
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFjb25ndXkiLCJhIjoiY2xmYmR0MmVkMHI3ZjN5bmd1Y3o2NjY2ciJ9.kketgg0Hmh7JiUqr55PSvg';

const Map = ({ defLat, defLng }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(defLat ?? -70.9);
  const [lat, setLat] = useState(defLng ?? 42.35);
  const [zoom, setZoom] = useState(9);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom,
      preserveDrawingBuffer: true
    });
  });
  useEffect(() => {
    if (map.current && defLat && defLng) {
      console.log(defLat, defLng)
      map.current.panTo([defLng, defLat]);
    }
  }, [defLng, defLat])

  const setMapImg = useAppStore((state) => state.setMapImg)
  const mapImg = useAppStore(state => state.mapImg);
  const handleMapSnapshot = () => {
    if (map.current) {
      const canvas = map.current.getCanvas();
      let url = canvas.toDataURL('image/png');
      setMapImg(url);
    }
  }
  return (
    <>
      <div ref={mapContainer} className="map-container" />
      <button className='capture-button' onClick={handleMapSnapshot}>{mapImg ? 'ReCapture?!' : 'Capture!!'}</button>
    </>
  )
}

export default Map