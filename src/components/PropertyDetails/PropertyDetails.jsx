import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as propertyService from "../../services/propertyService";
import ReviewForm from "../ReviewForm/ReviewForm";

const PropertyDetails = (props) => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState();

  useEffect(() => {
    const fetchProperty = async () => {
      const propertyData = await propertyService.show(propertyId);
      setProperty(propertyData);
    };
    fetchProperty();
  }, [propertyId]);

  const { handleDeleteProperty } = props;
  const {handleUpdateProperty} = props;


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
      const newReview = await propertyService.createReviews(
        reviewData,
        propertyId
      );
      setProperty((prev) => ({
        ...prev,
        reviews: [...(prev.reviews || []), newReview],
      }));
    } catch (err) {
      console.log(err);
    }
  };

  //   const handleEditReview = async (reviewId, newData) => {
  //   try {
  //     const updatedReview = await propertyService.updateReviews(propertyId, reviewId, newData)
  //     setProperty(prev => ({
  //       ...prev,
  //       reviews: prev.reviews.map(r => r.id === reviewId ? updatedReview : r)
  //     }))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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

      <button onClick={() => handleDeleteProperty(property._id || property.id)}>
        Delete {property.title}
      </button>

       <Link to={`/property/${propertyId}/edit`}>
        <button>Edit</button>  
      </Link> 

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
