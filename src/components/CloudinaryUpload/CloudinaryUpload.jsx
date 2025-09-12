import { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("files", file); // must match FastAPI endpoint

    try {
      const res = await axios.post(
        "https://home-harbor-backend-105746213cdf.herokuapp.com/upload/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setImageUrl(res.data.urls[0]); // FastAPI returns { urls: [ ... ] }
    } catch (err) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Upload failed, check backend logs");
    }
  };

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>

      {imageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="uploaded" width="200" />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
