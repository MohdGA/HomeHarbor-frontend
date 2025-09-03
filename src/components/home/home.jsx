import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import homePic from "../../assets/home-pic.jpg";
import { FaSearch, FaHome, FaMapMarkerAlt, FaStar, FaArrowRight, FaUsers, FaShieldAlt, FaClock } from "react-icons/fa";

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.section]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);


  const features = [
    {
      icon: <FaSearch />,
      title: "Smart Search",
      description: "Advanced filters to find your perfect property match"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Prime Locations",
      description: "Properties in the most desirable neighborhoods"
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Listings",
      description: "All properties are verified and authentic"
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      description: "Round-the-clock assistance for all your needs"
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "5K+", label: "Properties Listed" },
    { number: "50+", label: "Cities Covered" },
    { number: "99%", label: "Satisfaction Rate" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Property Buyer",
      content: "HomeHarbor made finding my dream home effortless. The platform is intuitive and the support team is amazing!",
      rating: 5
    },
    {
      name: "Denis S. Dujota",
      role: "Property Investor",
      content: "As an investor, I appreciate the detailed property information and market insights. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Chen",
      role: "First-time Buyer",
      content: "The verification process gave me confidence in my purchase. Thank you HomeHarbor for the seamless experience!",
      rating: 5
    }
  ];

  return (
    <div className="home-page">
     
      <section className="hero-section" data-section="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className={`hero-title ${isVisible.hero ? 'animate-in' : ''}`}>
              Find Your Dream
              <span className="gradient-text"> Home</span>
            </h1>
            <p className={`hero-subtitle ${isVisible.hero ? 'animate-in delay-1' : ''}`}>
              Discover exceptional properties in prime locations. Your perfect home is just a search away.
            </p>
            
            

          
            <div className={`cta-buttons ${isVisible.hero ? 'animate-in delay-3' : ''}`}>
              <Link to="/properties" className="btn-primary">
                <FaHome className="mr-2" />
                Browse Properties
              </Link>
              <Link to="/properties/new" className="btn-secondary">
                Add New Property
              </Link>
            </div>
          </div>

          <div className={`hero-image-container ${isVisible.hero ? 'animate-in delay-2' : ''}`}>
            <div className="floating-card card-1">
              <FaHome />
              <span>Premium Locations</span>
            </div>
            <div className="floating-card card-2">
              <FaStar />
              <span>5-Star Rated</span>
            </div>
            <img
              src={homePic}
              alt="Beautiful modern property"
              className="hero-image"
            />
          </div>
        </div>
      </section>

    
      <section className="features-section" data-section="features">
        <div className="container">
          <h2 className={`section-title ${isVisible.features ? 'animate-in' : ''}`}>
            Why Choose HomeHarbor?
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`feature-card ${isVisible.features ? 'animate-in' : ''}`}
                style={{'--delay': `${index * 0.2}s`}}
              >
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="stats-section" data-section="stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`stat-item ${isVisible.stats ? 'animate-in' : ''}`}
                style={{'--delay': `${index * 0.1}s`}}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="testimonials-section" data-section="testimonials">
        <div className="container">
          <h2 className={`section-title ${isVisible.testimonials ? 'animate-in' : ''}`}>
            What Our Clients Say
          </h2>
          <div className="testimonial-carousel">
            <div className="testimonial-container">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p>"{testimonial.content}"</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <strong>{testimonial.name}</strong>
                        <span>{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

    
      <section className="cta-section" data-section="cta">
        <div className="container">
          <div className={`cta-content ${isVisible.cta ? 'animate-in' : ''}`}>
            <h2>Ready to Find Your Dream Home?</h2>
            <p>Join thousands of satisfied customers who found their perfect property with HomeHarbor</p>
            <div className="cta-buttons">
              <Link to="/properties" className="btn-primary large">
                Start Your Search
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;