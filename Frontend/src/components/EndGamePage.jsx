import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { VotesContext } from "../contexts/VotesContext";
import { getMost } from "./Utils/utils";
import { TfiFaceSad } from "react-icons/tfi";

function EndGamePage({ playerList }) {
  const { votes } = useContext(VotesContext);

  const saboteurIndex = playerList.findIndex(
    (user) => user.isSaboteur === true
  );

  const mostVoted = getMost(votes);

  const navigate = useNavigate();

  const [resultsVisible, setResultsVisible] = useState(false);

  let saboteur = playerList[saboteurIndex];

  saboteur = "saul";

  const teamWin = mostVoted.length === 1 && mostVoted[0] === saboteur;

  mostVoted[0] = "Michael";

  return (
    <>
      {!resultsVisible && (
        <>
          {mostVoted.length === 1 ? (
            <div>
              <div className="parent">
                <img
                  src={"../../images/scroll2.png"}
                  className="title-scroll"
                />
                <div className="scroll-child">
                  <h2>
                    {mostVoted[0]}
                    <br />
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
          ) : (
            <div>
              <div className="parent">
                <img
                  src={"../../images/scroll2.png"}
                  className="title-scroll"
                />
                <div className="scroll-child">
                  <h2>
                    No one was thrown overboard! The imposter survives!
                    <TfiFaceSad />
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
        </>
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
          <h2>{saboteur}</h2>

          <div>
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

export default EndGamePage;
