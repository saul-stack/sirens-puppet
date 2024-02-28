import React, { useState, useEffect } from "react";

// Sample object for testing purposes
const samplePersons = [
  {
    name: "John Doe",
    profileImage: "../../images/gold coin image.png",
  },
  {
    name: "Jane Smith",
    profileImage: "../../images/gold coin image.png",
  },
  {
    name: "Alice Johnson",
    profileImage: "../../images/gold coin image.png",
  },
];

function SaboteurPage() {
  const [saboteurIndex, setSaboteurIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Generate a random index to choose the saboteur
    const randomIndex = Math.floor(Math.random() * samplePersons.length);
    setSaboteurIndex(randomIndex);
  }, []);

  const saboteur = samplePersons[saboteurIndex];

  useEffect(() => {
    const image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = saboteur.profileImage;
  }, [saboteur.profileImage]);

  const teamWin = saboteurIndex !== 0;

  return (
    <div
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: "7vh",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.9)",
      }}
    >
      <h2 style={{ color: "black", fontSize: "4vw" }}>
        Avast Ye! Who Be the Scallywag Saboteur?
      </h2>
      <div>
        <h3 style={{ color: "black", fontSize: "2vw" }}>{saboteur.name}</h3>
        {imageLoaded && (
          <img
            src={saboteur.profileImage}
            alt={saboteur.name}
            style={{
              borderRadius: "50%",
              animation: "spinImage 2s linear infinite",
              height: "5vw",
              width: "5vw",
            }}
            className="saboteur-image"
          />
        )}
        {teamWin ? (
          <p style={{ color: "black", fontSize: "2vw" }}>
            The Saboteur loses! The team wins!
          </p>
        ) : (
          <p style={{ color: "black", fontSize: "2vw" }}>
            The Saboteur wins! The team loses!
          </p>
        )}
      </div>
    </div>
  );
}

export default SaboteurPage;
