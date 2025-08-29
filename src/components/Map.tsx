import React from 'react'
import { MapContainer, TileLayer, Marker, Popup,useMapEvents } from "react-leaflet";
import L from "leaflet"

import { useDispatch } from 'react-redux';
import { changeLocation } from '../features/otherApi/otherSlice';

type MapParameter = {
    lat : number
    long:number
}

const marker = "/project-FetchApi/location-pin.webp" 

const MyMarker = L.icon({
    iconUrl: marker,
    iconSize : [40,40],
    iconAnchor: [20, 40], 
    popupAnchor: [0, -40] 
})

const LocationMarker = () => {
  const dispatch = useDispatch()
    useMapEvents({
      click(e){
        const {lat, lng} = e.latlng
        dispatch(changeLocation({
          latitude : Number(lat.toFixed(4)),
          longitude : Number(lng.toFixed(4))
        }))
      },
    })
  
  return null
} 

const Map :React.FC<MapParameter> = ({lat,long}) => {
    const defaultCenter :[number, number]= [lat, long]


  return (
    <MapContainer
        center={defaultCenter}
        zoom={18}
        scrollWheelZoom
        className="w-full h-[70vh] "
    >  
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

      attribution='&copy; OpenStreetMap contributors'
      />

      <LocationMarker/>
      <Marker position={defaultCenter} icon={MyMarker}>
          <Popup>
              {lat},{long}
          </Popup>
      </Marker>

    </MapContainer>
  )
}

export default Map