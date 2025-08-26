import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
type MapParameter = {
    lat : number
    long:number
}


const Map :React.FC<MapParameter> = ({lat,long}) => {
    const defaultCenter :[number, number]= [lat, long]

  return (
    <MapContainer
        // @ts-ignore
        center={defaultCenter}
        zoom={18}
        scrollWheelZoom ={false}
        className="w-full h-full"
    >  
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // @ts-ignore
        attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={defaultCenter}>
            <Popup>
                {lat}, {long}
            </Popup>
      </Marker>

    </MapContainer>
  )
}

export default Map