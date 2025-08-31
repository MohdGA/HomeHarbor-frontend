import {useParams, Link } from "react-router-dom";
import { useEffect, useState } from 'react'
import * as propertyService from '../../services/propertyService'

const PropertyDetails = (props) => {

  const { propertyId } = useParams();
  const [property, setProperty] = useState();

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyData = await propertyService.show(propertyId)
      setProperty(propertyData)
    };
    fetchProperty()
  }, [propertyId]
)

  const {handleDeleteProperty } = props;
  const {handleUpdateProperty} = props;

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <>
      <Link to="/properties"><h2>← Back</h2></Link>   

      <h1>{property.title}</h1>
      <p>Price: {property.price} BHD</p>
      <p>Rooms: {property.numOfRooms}</p>
      <p>Bathrooms: {property.numOfBathrooms}</p> 
      <p>Location: {property.location}</p> 

      <button onClick={() => handleDeleteProperty(property._id || property.id)}>
        Delete {property.title}
      </button> 

      <Link to={`/property/${propertyId}/edit`}>
        <button>Edit</button>  
      </Link> 
    </>
  )
}

export default PropertyDetails
