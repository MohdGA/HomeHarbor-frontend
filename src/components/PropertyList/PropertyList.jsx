import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import categoryService from "../../services/categoryService";

const PropertyList = ({ properties }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // filter state

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

  // filter properties based on category
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

      {/* category filter dropdown */}
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
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default PropertyList;
