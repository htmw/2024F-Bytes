import React, { useEffect, useState } from "react";
import languages from "./languageMapping.json";
const FavoriteComponent = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const email = localStorage.getItem("loggedEmail");
  const [isFavorite, setIsFavorite] = useState(false);
  // Fetch translation history from the database
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `https://speakez-server.uk.r.appspot.com/api/favourite?email=${encodeURIComponent(
            email
          )}`,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (Object.keys(data.data).length != 0) setFavorites(data.data);
          else setFavorites([]); // Assuming data is an array of objects { input, output }
        } else {
          setErrorMessage("Failed to fetch favorites.");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setErrorMessage("Error fetching favorites.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [isFavorite]);
  const removeFavorite = async (id) => {
    try {
      const data = {
        id: id,
        email: localStorage.getItem("loggedEmail"),
      };
      const response = await fetch(
        "https://speakez-server.uk.r.appspot.com/api/favourite",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const res = await response.json();
        setIsFavorite((prev) => !prev);
      } else {
        console.error("Failed to add Favourite");
      }
    } catch (error) {
      console.error("Error while processing:", error);
    } finally {
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] w-full max-w-xl mx-auto rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">Favorites</h2>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 overflow-y-auto">
        {loading ? (
          <div className="text-gray-500 text-center">Loading...</div>
        ) : errorMessage ? (
          <div className="text-red-500 text-center">{errorMessage}</div>
        ) : favorites.length === 0 ? (
          <div className="text-gray-500 text-center">No translations saved</div>
        ) : (
          <div className="space-y-4">
            {favorites.map((entry, index) => (
              <div
                key={index}
                className="relative border border-gray-300 p-4 rounded-md bg-gray-50 shadow-sm"
              >
                <button
                  onClick={() => removeFavorite(entry.id)}
                  className="absolute top-2 right-2 text-indigo-500"
                >
                  <i className="fa-solid fa-star"></i>
                </button>
                <h3 className="font-semibold text-gray-700 mb-2">
                  {languages[entry.sourceLanguage]}
                  <i className="fa-solid fa-arrow-right mx-2"></i>
                  {languages[entry.destinationLanguage]}
                </h3>
                <p className="text-gray-600 mb-2">{entry.transcription}</p>
                <p className="text-gray-800 mb-2 font-medium">
                  {entry.translation}
                </p>
                <p className="text-gray-500 text-sm">{entry.output}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteComponent;
