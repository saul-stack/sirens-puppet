import React, { useState } from 'react';

// Sample object for testing purposes
const samplePersons = [
  {
    name: 'John Doe',
    profileImage: '../../images/gold coin image.png'
  },
  {
    name: 'Jane Smith',
    profileImage: '../../images/gold coin image.png'
  },
  {
    name: 'Alice Johnson',
    profileImage: '../../images/gold coin image.png'
  }
];

function VotingPage() {
  const [votedIndex, setVotedIndex] = useState(null);

  // Function to handle voting
  const handleVote = (index) => {
    if (votedIndex === null) {
      setVotedIndex(index);
    }
  };

  // Get the voted person's information
  const votedPerson = votedIndex !== null ? samplePersons[votedIndex] : null;

  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '10px', color: 'black', fontSize: '50px',
    // need to add a box shadow to the voting page
    boxShadow: '1px 1px 50px black'
    
    }}>
      <h2>Arrr! Hunt Down the Scallywag Saboteur!</h2>
      {samplePersons.map((person, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', 
          boxShadow: '1px 1px 50px #888888'

          }}>
          <img src={person.profileImage}  style={{ width: '100px', marginRight: '10px' }} />
          <div>{person.name}</div>
          {/* Button for voting */}
          <button 
            onClick={() => handleVote(index)} 
            disabled={votedIndex !== null} // Disable button if already voted
            style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '14px' }}
          >
            Vote
          </button>
        </div>
      ))}
      {/* Display the voted person if there's a vote */}
      {votedPerson && (
        <div style={{ marginTop: '20px' }}>
          <h3>Voted Person:</h3>
          <div>
            <img src={votedPerson.profileImage} style={{ width: '100px', marginRight: '10px' }} />
            <span>{votedPerson.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default VotingPage;


