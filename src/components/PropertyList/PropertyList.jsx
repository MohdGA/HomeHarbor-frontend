import { Link } from "react-router-dom";

const PropertyList = (props) => {
  const { properties } = props; 

  if (!properties || properties.length === 0) {
    return <h2>No Properties Yet</h2>;
  }

// ========================================================
  const {handleDeleteProperty } = props;
// ===============================================
  return (
    <div>
      <h1>Properties List</h1>
         {properties.map((property, index) => (
            <div key={property._id || index}>
              
            <Link to={`/properties/${property._id}`}>

                    <h2>{property.title}</h2>
         </Link>
                  <p>Price: {property.price} BHD</p>
                  <p>Rooms: {property.numOfRooms}     </p>
                  <p>Bathrooms: {property.numOfBathrooms}</p> 
                  <p>Location: {property.location}</p>

                    <p><small> Owner: {property.user?.username || "Unknown"} </small></p>
{/* ========================================================================================================================================================= */}
                 <button onClick={() => handleDeleteProperty(property._id || property.id)}>Delete {property.title}</button>
 {/*=============================================================================================================================================================  */}
             <hr />
             
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
