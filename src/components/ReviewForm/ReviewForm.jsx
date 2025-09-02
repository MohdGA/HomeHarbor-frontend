import { useState, useEffect } from 'react';
import * as propertyService from './../../services/propertyService';
import "./ReviewForm.css"

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
<div className="review-form-wrapper">
  <form onSubmit={handleSubmit}>
    <h3 className="review-form-title">Add a Review</h3>
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
</div>

);


};

export default ReviewForm;
