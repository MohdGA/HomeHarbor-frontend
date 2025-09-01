import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as propertyService from '../../services/propertyService'



const PropertyForm = (props) => {
    const { propertyId } = useParams()
    const initialState = {
       title: '',
       price: '',
       numOfRooms: '',
       numOfBathrooms: '',
       location: '' 
    }

const [formData, setFormData] = useState(initialState)

useEffect(() => {
        const fetchProperty = async () => {
            const data = await propertyService.show(propertyId)
            setFormData(data)
        }
        if (propertyId) fetchProperty()
    }, [propertyId])



const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value})
}

const handleSubmit = (evt) => {
    evt.preventDefault()
    
    if (propertyId) {
        props.handleUpdateProperty(formData, propertyId)
    } else {
        props.handleAddProperty(formData)
    }
}

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
             <button type="submit">Submit</button>
        </form>
    </main>
)
}

export default PropertyForm