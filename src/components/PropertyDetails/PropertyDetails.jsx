import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as propertyService from "../../services/propertyService";
import ReviewForm from "../ReviewForm/ReviewForm";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const PropertyDetails = (props) => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState();
  const [coordinates, setCoordinates] = useState({ lat: 26.0667, lng: 50.5577 }); 

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyData = await propertyService.show(propertyId);
      setProperty(propertyData);

     
      if (propertyData.location) {
        const [lat, lng] = propertyData.location.split(",").map(Number);
        if (!isNaN(lat) && !isNaN(lng)) setCoordinates({ lat, lng });
      }
    };
    fetchProperty();
  }, [propertyId]);

  const { handleUpdateProperty } = props;
  const isOwner = property?.user?.username === props?.user?.username;

  const handleDeleteReview = async (reviewId) => {
    try {
      await propertyService.deleteReviews(reviewId);
      setProperty((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r.id !== reviewId),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleReview = async (reviewData) => {
    try {
      const newReview = await propertyService.createReviews(reviewData, propertyId);
      setProperty((prev) => ({
        ...prev,
        reviews: [...(prev.reviews || []), newReview],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  if (!property) {
    return <p>Loading property details...</p>;
  }

  return (
    <>
      <Link to="/properties">
        <h2>← Back</h2>
      </Link>

      <h1>{property.title}</h1>
      <p>Price: {property.price} BHD</p>
      <p>Rooms: {property.numOfRooms}</p>
      <p>Bathrooms: {property.numOfBathrooms}</p>
      <p>Location: {property.location}</p>
      {property.imageUrl && <img src={property.imageUrl} alt={property.title} width="300" />}

      
      <div style={{ width: "100%", height: "300px", margin: "10px 0" }}>
        <Map
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            zoom: 12
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          <Marker latitude={coordinates.lat} longitude={coordinates.lng} color="red" />
        </Map>
      </div>

      {isOwner && (
        <>
          <button onClick={() => props.handleDeleteProperty(property.id)}>
            Delete {property.title}
          </button>

          <Link to={`/property/${propertyId}/edit`}>
            <button>Edit</button>
          </Link>
        </>
      )}

      <h3>Add a Review</h3>
      <ReviewForm handleReview={handleReview} />

      <h3>Reviews</h3>
      <ul>
        {property.reviews?.map((r) => (
          <li key={r.id}>
            <strong>{r.user?.name || r.user_id}</strong>: {r.content}
            <button onClick={() => handleDeleteReview(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PropertyDetails;
