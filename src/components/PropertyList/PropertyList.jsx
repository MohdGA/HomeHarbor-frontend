import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../services/categoryService";
import * as RequestService from "../../services/requestService";
import * as NotificationService from "../../services/notificationService";

const PropertyList = ({ properties, currentUser }) => {
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

  // ✅ Only keep notifications for properties owned by currentUser
  const ownerNotifications = notifications.filter((n) => {
    const property = properties.find((p) => p.id === n.property_id);
    return property?.user?.email === currentUser?.email;
  });

  // Category filter
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
    <div>
      <h1>Properties List</h1>

      {/* 🔔 Notification bell */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => setShowNotifications(!showNotifications)}>
          🔔 {ownerNotifications.filter((n) => !n.seen).length}
        </button>
      </div>

      {/* Notifications dropdown (no white box) */}
      {showNotifications && (
        <div style={{ padding: "0.5rem 0", marginBottom: "1rem" }}>
          <h4>Notifications</h4>
          {ownerNotifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            ownerNotifications.map((n) => (
              <div key={n.id} style={{ marginBottom: "0.5rem" }}>
                <span>
                  Notification ID: {n.id} – Request: {n.request_id} – Property:{" "}
                  {n.property_id} – {n.seen ? "Seen" : "Unseen"}
                </span>
                {!n.seen && (
                  <button onClick={() => handleMarkSeen(n.id)}>Mark Seen</button>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Category filter */}
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

      <hr />

      {filteredProperties.length === 0 ? (
        <p>No properties in this category.</p>
      ) : (
        filteredProperties.map((property, index) => (
          <div key={property._id || index}>
            <Link to={`/properties/${property.id}`}>
              <h2>{property.title}</h2>
            </Link>
            {property.images && property.images.length > 0 && (
              <img
                src={property.images[0]}
                alt={property.title}
                width="200"
                style={{ display: "block", margin: "10px 0" }}
              />
            )}
            <p>Price: {property.price} BHD</p>
            <p>Category: {property.category?.name || "Uncategorized"}</p>
            <p>Rooms: {property.numOfRooms}</p>
            <p>Bathrooms: {property.numOfBathrooms}</p>
            <p>Location: {property.location}</p>
            <p>
              <small>Owner: {property.user?.username || "Unknown"}</small>
            </p>

            {/* ✅ Hide Buy button if current user is the property owner */}
            {property.user?.email !== currentUser?.email && (
              <button onClick={() => handleBuy(property.id)}>Buy</button>
            )}

            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;
