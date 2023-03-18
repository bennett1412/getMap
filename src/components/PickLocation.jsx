import React, { useEffect } from 'react'
import Map from './Map'
import '../styles/pickloc.scss';

const PickLocation = () => {
  return (
    <section className='pick-loc'>
      <Map />
    </section>
  )
}

export default PickLocation