import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

function WalkThePlank() {
  const navigate = useNavigate();
  const [saboteurIndex, setSaboteurIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);

  useEffect(() => {
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
    <>
      {!resultsVisible && (
        <div>
          <div className="parent">
            <img src={"../../images/scroll2.png"} className="title-scroll" />
            <div className="scroll-child">
              <h2>
                (player) <br />
                must walk the plank...
              </h2>
            </div>
          </div>
          <button
            onClick={() => {
              setResultsVisible(true);
            }}
          >
            View results
          </button>
        </div>
      )}

      {resultsVisible && (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            padding: "7vh",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.9)",
          }}
        >
          <h2 style={{ color: "black", fontSize: "4vw" }}>
            The saboteur was...
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
                The crew made it home safely.
              </p>
            ) : (
              <p style={{ color: "black", fontSize: "2vw" }}>
                The crew never made it back to port...
              </p>
            )}
            <button
              onClick={() => {
                navigate("/rooms");
              }}
            >
              Play again.
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default WalkThePlank;
