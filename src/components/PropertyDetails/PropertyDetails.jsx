import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState, useCallback, useMemo } from "react";

import * as propertyService from "../../services/propertyService";
import ReviewForm from "../ReviewForm/ReviewForm";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { FaBed, FaBath, FaMoneyBillWave, FaMapMarkerAlt, FaHome } from "react-icons/fa";
import "./PropertyDetails.css";

const PropertyDetails = (props) => {
  const { propertyId } = useParams();
  const [property, setProperty] = useState();
  const [coordinates, setCoordinates] = useState({ lat: 26.0667, lng: 50.5577 });
  const [mainImage, setMainImage] = useState(null);
  const [fade, setFade] = useState(false);

  
  const formatText = useCallback((text) => {
    if (!text) return '';
    return text;
  }, []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyData = await propertyService.show(propertyId);
        setProperty(propertyData);
        setMainImage(propertyData.images?.[0] || null);
        
        if (propertyData.location) {
          const [lat, lng] = propertyData.location.split(",").map(Number);
          if (!isNaN(lat) && !isNaN(lng)) {
            setCoordinates({ lat, lng });
          }
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    
    fetchProperty();
  }, [propertyId]);


  useEffect(() => {
    if (property?.images?.length > 1) {
      const interval = setInterval(() => {
        const currentIndex = property.images.indexOf(mainImage);
        const nextIndex = (currentIndex + 1) % property.images.length;
        handleSetMainImage(property.images[nextIndex]);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [property, mainImage]);

  const handleSetMainImage = useCallback((img) => {
    setFade(true);
    setTimeout(() => {
      setMainImage(img);
      setFade(false);
    }, 400);
  }, []);

  const isOwner = property?.user?.username === props?.user?.username;

  const handleDeleteReview = async (reviewId) => {
    try {
      await propertyService.deleteReviews(reviewId);
      setProperty((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r.id !== reviewId),
      }));
    } catch (err) {
      console.error("Error deleting review:", err);
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
      console.error("Error creating review:", err);
    }
  };

  const openInGoogleMaps = useCallback(() => {
    if (!property?.location) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${property.location}`;
    window.open(url, "_blank");
  }, [property?.location]);


  const safeImages = property?.images || [];
  const safeReviews = property?.reviews || [];
  const displayMainImage = mainImage || safeImages[0];

  if (!property) {
    return <div className="loading-container"><p>Loading property details...</p></div>;
  }

  return (
    <>
      <Link to="/properties" className="back-link">← Back</Link>
      
      <div className="property-container">
      
        <div className="image-section">
          {displayMainImage && (
            <img
              src={displayMainImage}
              alt="Main property image"
              className={`main-image ${fade ? "fade-out" : ""}`}
            />
          )}
          
          {safeImages.length > 1 && (
            <div className="thumbnail-images">
              {safeImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Property thumbnail ${i + 1}`}
                  className={img === mainImage ? "active" : ""}
                  onClick={() => handleSetMainImage(img)}
                />
              ))}
            </div>
          )}

         
          <div className="info-cards-row">
            <InfoCard 
              icon={<FaMoneyBillWave />} 
              title="Price" 
              value={`${property.price} BHD`} 
              
            />
            <InfoCard 
              icon={<FaBed />} 
              title="Bedrooms" 
              value={property.numOfRooms || 'N/A'} 
             
            />
            <InfoCard 
              icon={<FaBath />} 
              title="Bathrooms" 
              value={property.numOfBathrooms || 'N/A'} 
              
            />
            <InfoCard 
              icon={<FaMapMarkerAlt />} 
              title="Address" 
              value={property.location} 
               
              clickable 
              onClick={openInGoogleMaps}
            />
            <InfoCard 
              icon={<FaHome />} 
              title="Type" 
              value={property.category?.name || property.category || "Other"} 
               
            />
          </div>
        </div>

      
        <div className="info-section">
          <h1>{property.title}</h1>
          <p><strong>Description:</strong> {property.description || 'No description available.'}</p>
          
          {isOwner && (
            <div className="owner-actions">
              <button 
                onClick={() => props.handleDeleteProperty(property.id)}
                className="delete-btn"
              >
                Delete
              </button>
              <Link to={`/property/${propertyId}/edit`}>
                <button className="edit-btn">Edit</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      
      <div className="map-container">
        <Map
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            zoom: 12
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
        >
          <Marker latitude={coordinates.lat} longitude={coordinates.lng} anchor="bottom">
            <img
              src="https://cdn-icons-png.flaticon.com/512/69/69524.png"
              alt="Property location marker"
              style={{ width: "30px", height: "30px" }}
            />
          </Marker>
        </Map>
      </div>

     
      <div className="review-section">
        <div className="review-header">
          <h3>Reviews & Feedback ({safeReviews.length})</h3>
          <div className="review-stats">
            <span className="review-count">{safeReviews.length} total reviews</span>
          </div>
        </div>
        
        <div className="review-form-container">
          <ReviewForm handleReview={handleReview} />
        </div>
        
        {safeReviews.length === 0 ? (
          <div className="no-reviews">
            <div className="no-reviews-icon">💬</div>
            <p>No reviews yet. Be the first to share your experience with this property!</p>
          </div>
        ) : (
          <div className="review-list-container">
            <ul className="review-list">
              {safeReviews.map((r, index) => (
                <li key={r.id} className="review-item" style={{'--animation-delay': `${index * 0.1}s`}}>
                  <div className="review-content">
                    <div className="review-header-item">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          {(r.user?.name || `User ${r.user_id}`).charAt(0).toUpperCase()}
                        </div>
                        <div className="reviewer-details">
                          <strong className="reviewer-name">
                            {r.user?.name || `User`}
                          </strong>
                          <span className="review-date">
                            {r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recently'}
                          </span>
                        </div>
                      </div>
                      {(isOwner || r.user_id === props?.user?.id) && (
                        <button 
                          className="delete-review-btn"
                          onClick={() => handleDeleteReview(r.id)}
                          title="Delete this review"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                    <div className="review-text">
                      {r.content}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};


const InfoCard = React.memo(({ icon, title, value, color, clickable, onClick }) => (
  <div
    className={`info-card ${clickable ? "clickable" : ""}`}
    style={{ borderLeft: `5px solid ${color}` }}
    onClick={onClick}
    title={clickable ? `Click to view on map: ${value}` : value}
  >
    <div className="icon" style={{ color }}>{icon}</div>
    <div className="info-text">
      <span className="info-title">{title}</span>
      <span className="info-value">{value}</span>
    </div>
  </div>
));


export default PropertyDetails;