import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import categoryService from "../../services/categoryService";
import * as RequestService from "../../services/requestService";
import * as NotificationService from "../../services/notificationService";
import "./PropertyList.css";

const PropertyList = ({ properties, currentUser }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); 

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await categoryService.getCategories();
        setCategories(cats || []);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };
    loadCategories();
  }, []);

  const handleBuy = async (propertyId) => {
    try {
      const request = await RequestService.create({ approval: false }, propertyId);
      const notification = await NotificationService.index(request.id);
      setNotifications((prev) => [...prev, notification]);
      alert("Request created and notification sent!");
    } catch (err) {
      console.error("Failed to create request:", err);
      alert("Failed to create request.");
    }
  };

  const handleMarkSeen = async (notificationId) => {
    try {
      const updated = await NotificationService.markSeen(notificationId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === updated.id ? updated : n))
      );
    } catch (err) {
      console.error("Failed to mark seen:", err);
    }
  };

  const ownerNotifications = notifications.filter((n) => {
    const property = properties.find((p) => p.id === n.property_id);
    return property?.user?.email === currentUser?.email;
  });

  const filteredProperties = selectedCategory
    ? properties.filter((property) => {
        const propertyCategoryId =
          property.category?.id || property.category_id || property.category;
        return String(propertyCategoryId) === String(selectedCategory);
      })
    : properties;

  if (!properties || properties.length === 0) {
    return <h2>No Properties Yet</h2>;
  }

  return (
    <div className="property-list">
      <h1>Properties List</h1>

      <div className="filter-bell-wrapper">
        <div className="category-filter">
          <label htmlFor="category-filter">Filter by Category: </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="notification-bell"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaBell className="bell-icon" />
          {ownerNotifications.filter((n) => !n.seen).length > 0 && (
            <span className="notification-count">
              {ownerNotifications.filter((n) => !n.seen).length}
            </span>
          )}
        </button>
      </div>

      {showNotifications && (
        <div className="notifications">
          <h4>Notifications</h4>
          {ownerNotifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            ownerNotifications.map((n) => (
              <div key={n.id}>
                <span>
                  Notification ID: {n.id} – Request: {n.request_id} – Property: {n.property_id} – {n.seen ? "Seen" : "Unseen"}
                </span>
                {!n.seen && (
                  <button onClick={() => handleMarkSeen(n.id)}>Mark Seen</button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <hr />

      <div className="property-grid">
        {filteredProperties.length === 0 ? (
          <p>No properties in this category.</p>
        ) : (
          filteredProperties.map((property, index) => (
            <div
              key={property._id || index}
              className="property-card"
              onClick={() => navigate(`/properties/${property.id}`)}
            >
              <h2>{property.title}</h2>
              {property.images && property.images.length > 0 && (
                <img src={property.images[0]} alt={property.title} />
              )}
              <p>Price: {property.price} BHD</p>
              <p>Category: {property.category?.name || "Uncategorized"}</p>
              <p>Rooms: {property.numOfRooms}</p>
              <p>Bathrooms: {property.numOfBathrooms}</p>
              <p>Location: {property.location}</p>
              <p>
                <small>Owner: {property.user?.username || "Unknown"}</small>
              </p>

              {property.user?.email !== currentUser?.email && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handleBuy(property.id);
                  }}
                >
                  Buy
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyList;
