import { useState, useEffect } from 'react';
import * as propertyService from './../../services/propertyService';

const ReviewForm = (props) => {
  const [formData, setFormData] = useState({ content: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  };


  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleReview(formData)
    setFormData({ content: '' })
  };
 

/*  
  const handleSubmit = async (evt) => {
evt.preventDefault();
try {
const newReview = await propertyService.createReviews(formData, propertyId);
setFormData({ content: '' });
if (onReviewAdded) onReviewAdded(newReview);
} catch (err) {
console.log(err);
}
};

*/


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="content-input">Your review:</label>
      <textarea
        required
        name="content"
        id="content-input"
        value={formData.content}
        onChange={handleChange}
      />
      <button type="submit">ADD REVIEW</button>
    </form>
  );
};

export default ReviewForm;
