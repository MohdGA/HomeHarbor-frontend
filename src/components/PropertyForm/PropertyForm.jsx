import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as propertyService from '../../services/propertyService';
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

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
  const [coordinates, setCoordinates] = useState({ lat: 26.0667, lng: 50.5577 });

  useEffect(() => {
    const fetchProperty = async () => {
      const data = await propertyService.show(propertyId);
      setFormData(data);
      if (data.location) {
        const [lat, lng] = data.location.split(',').map(Number);
        if (!isNaN(lat) && !isNaN(lng)) setCoordinates({ lat, lng });
      }
    };
    if (propertyId) fetchProperty();
  }, [propertyId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

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
      setFormData({ ...formData, imageUrl: data.url });
    } catch (err) {
      console.error(err);
      alert("Image upload failed, try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    setCoordinates({ lat, lng });
    setFormData({ ...formData, location: `${lat.toFixed(6)},${lng.toFixed(6)}` });
  };

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
          placeholder="Click on map to select location"
          value={formData.location}
          readOnly
        />


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
            onClick={handleMapClick}
          >
            <Marker latitude={coordinates.lat} longitude={coordinates.lng} color="red" />
          </Map>
        </div>

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
