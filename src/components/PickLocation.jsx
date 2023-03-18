import React, { useEffect, useState } from 'react'
import Map from './Map'
import { toast } from 'react-hot-toast'
import '../styles/pickloc.scss';


const PickLocation = () => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  useEffect(() => {
    if (window.navigator.geolocation) {
      if (!window.navigator.permissions.query({ name: 'geolocation' }))
        toast('Please allow us to access your location');
      window.navigator.geolocation.getCurrentPosition((res) => {
        console.log(res.coords)
        setLat(res.coords.latitude);
        setLng(res.coords.longitude);
      })
    }
  }, [])

  return (
    <section className='pick-loc'>
      <Map defLat={lat} defLng={lng} />
    </section>
  )
}

export default PickLocation