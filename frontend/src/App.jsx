import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import "./App.css";
import Upload from "./Upload";
// Import all images from the assets folder
const importAll = (r) => {
  return r.keys().map(r);
};

const images = Object.values(import.meta.glob('./assets/*.{png,jpg}', { eager: true })).map((img) => img.default);


const ImageCarousel = () => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [key, setKey] = useState(0); // Reset animation when switching manually
  
	useEffect(() => {
	  const interval = setInterval(() => {
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
		setKey((prev) => prev + 1); // Force animation reset
	  }, 3000);
  
	  return () => clearInterval(interval);
	}, []);
  
	const nextImage = () => {
	  setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
	  setKey((prev) => prev + 1);
	};
  
	const prevImage = () => {
	  setCurrentImageIndex((prevIndex) =>
		prevIndex === 0 ? images.length - 1 : prevIndex - 1
	  );
	  setKey((prev) => prev + 1);
	};
  
	return (
	  <div id="image-carousel">
		{/* WhatsApp-style indicators at the top */}
		<div id="carousel-indicators">
		  {images.map((_, index) => (
			<div key={index} className="progress-bar">
			  <div
				key={key} // Reset animation on change
				className={`progress-fill ${index === currentImageIndex ? "fill" : ""}`}
			  ></div>
			</div>
		  ))}
		</div>
  
		<div id="carousel-container">
		  <button id="prev-button" onClick={prevImage}>
			<ChevronLeft />
		  </button>
  
		  <img
			src={images[currentImageIndex]}
			alt={`Slide ${currentImageIndex + 1}`}
			id="carousel-image"
		  />
  
		  <button id="next-button" onClick={nextImage}>
			<ChevronRight />
		  </button>
		</div>
	  </div>
	);
  };
const MPesaWrappedLanding = () => {
  const [email, setEmail] = useState('');

  return (
    <div id="app-container">
      {/* Navigation */}
      <nav id="navigation">
        <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
          <div id="logo"></div>
          <div id="site-title">M-Pesa Wrapped</div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content">
        <div id="left-content">
          <h2 id="headline">
            Your Financial Story,
            <br />
            <span id="headline-highlight">Unwrapped</span>
          </h2>
          <p id="description">
            Discover insights into your mobile money journey. See your spending patterns, top transactions, and financial highlights – all in one place.
          </p>
          <Link to="/upload">
            <button type="submit" id="submit-button">
              Upload PDF<ArrowRight style={{marginLeft: '0.5rem'}} />
            </button>
            </Link>
          {/* Features */}
          <div id="features-section">
            <div className="feature">
              <h3 className="feature-title">Spending Breakdown</h3>
              <p className="feature-description">Understand where your money goes</p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Transaction Insights</h3>
              <p className="feature-description">Top merchants and categories</p>
            </div>
            <div className="feature">
              <h3 className="feature-title">Mobile Money Trends</h3>
              <p className="feature-description">Year-end financial summary</p>
            </div>
          </div>
          {/* About Section */}
          <div id="about-section">
            <h2>About</h2>
            <p>
              MpesaWrapped was inspired by the need to better understand mobile money transactions. What started as a simple idea to track spending evolved into a tool that provides clear financial insights.
            </p>

            <button id="show-more-btn" onClick={() => {
              document.getElementById("hidden-about-content").style.display = "block";
              document.getElementById("show-more-btn").style.display = "none";
            }}>
              Show More
            </button>

            <div id="hidden-about-content" style={{ display: "none" }}>
              <p>
                This project is part of my portfolio and reflects my journey in software development. You can explore more about it on GitHub.
              </p>

              {/* Links */}
              <p>
                <a href="YOUR_GITHUB_REPO" target="_blank">GitHub Repository</a> | 
                <a href="YOUR_LINKEDIN" target="_blank">LinkedIn</a> | 
                <a href="YOUR_GITHUB" target="_blank">GitHub</a> | 
                <a href="YOUR_TWITTER" target="_blank">Twitter</a>
              </p>
            </div>
          </div>

        </div>
        
        <div id="right-content">
          <ImageCarousel />
        </div>
      </main>

      {/* Footer */}
      <footer id="footer">
        <p>© 2025 M-Pesa Wrapped. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MPesaWrappedLanding />} />
        <Route path ="/upload" element={<Upload />} />
        </Routes>
    </Router>
  )
}
export default App;