import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as propertyService from '../../services/propertyService';

const PropertyForm = ({ handleAddProperty, handleUpdateProperty }) => {
  const { propertyId } = useParams();

  const initialState = {
    title: '',
    price: '',
    numOfRooms: '',
    numOfBathrooms: '',
    location: '',
    imageUrl: '' // Cloudinary URL
  };

  const [formData, setFormData] = useState(initialState);
  const [uploading, setUploading] = useState(false);

  // Fetch property if editing
  useEffect(() => {
    const fetchProperty = async () => {
      const data = await propertyService.show(propertyId);
      setFormData(data);
    };
    if (propertyId) fetchProperty();
  }, [propertyId]);

  // Handle input change
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  // Handle image upload to Cloudinary
  const handleImageChange = async (evt) => {
    const file = evt.target.files[0];
    if (!file) return;

    setUploading(true);
    const formDataFile = new FormData();
    formDataFile.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formDataFile
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      // Use a temp variable to show the updated state immediately
      const newFormData = { ...formData, imageUrl: data.url };
      setFormData(newFormData);
      console.log("Updated formData:", newFormData);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed, try again.");
    } finally {
      setUploading(false);
    }
  };

  // Handle form submit
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (uploading) return alert("Image is still uploading, please wait...");

    if (propertyId) {
      handleUpdateProperty(formData, propertyId);
    } else {
      handleAddProperty(formData);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          placeholder="Title of property"
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="price-input">Price</label>
        <input
          required
          type="number"
          name="price"
          id="price-input"
          placeholder="Property price"
          value={formData.price}
          onChange={handleChange}
        />

        <label htmlFor="numOfRooms-input">Number Of Rooms</label>
        <input
          required
          type="number"
          name="numOfRooms"
          id="numOfRooms-input"
          placeholder="Rooms number"
          value={formData.numOfRooms}
          onChange={handleChange}
        />

        <label htmlFor="numOfBathrooms-input">Number Of Bathrooms</label>
        <input
          required
          type="number"
          name="numOfBathrooms"
          id="numOfBathrooms-input"
          placeholder="Bathrooms number"
          value={formData.numOfBathrooms}
          onChange={handleChange}
        />

        <label htmlFor="location-input">Location</label>
        <input
          required
          type="text"
          name="location"
          id="location-input"
          placeholder="Location of property"
          value={formData.location}
          onChange={handleChange}
        />

        <label htmlFor="image-input">Property Image</label>
        <input
          type="file"
          name="image"
          id="image-input"
          accept="image/*"
          onChange={handleImageChange}
        />

        {uploading && <p>Uploading image...</p>}

        {formData.imageUrl && (
          <img src={formData.imageUrl} alt="Property Preview" width="200" />
        )}

        <button type="submit">{propertyId ? "Update" : "Create"} Property</button>
      </form>
    </main>
  );
};

export default PropertyForm;
