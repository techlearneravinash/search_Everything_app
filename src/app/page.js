"use client";
import "./page.css";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [query, setQuery] = useState("");
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const searchHotels = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/hotels?query=${query}`);
      setHotels(response.data.organic_results);
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastHotel = currentPage * resultsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - resultsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <h1>Real Estate Scraper</h1>
        </div>
        <div className="search_Box">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter MagicBricks Listing URL"
          />
        </div>
        <div className="searchBtn">
          <button onClick={searchHotels} disabled={loading}>
            {loading ? "Scrape..." : "Scrape"}
          </button>
        </div>
      </div>

      <div>
        {hotels.length > 0 && (
          <div className="hotel-cards-container">
            {currentHotels.map((hotel, index) => (
              <div key={index} className="hotel-card">
                <h2>{hotel.title}</h2>
                <p>{hotel.snippet}</p>
                <a href={hotel.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
                {hotel.thumbnail && (
                  <div className="hotel-image">
                    <img
                      src={hotel.thumbnail}
                      alt={hotel.title}
                      className="hotel-thumbnail"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {hotels.length > 0 && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(Math.ceil(hotels.length / resultsPerPage))].map(
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              )
            )}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(hotels.length / resultsPerPage)
              }
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
