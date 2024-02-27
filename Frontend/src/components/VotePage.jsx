import React, { useState } from 'react';

const persons = [
  {
    id: 1,
    name: "John Doe",
    profileImage: "https://example.com/john-doe-profile.jpg"
  },
  {
    id: 2,
    name: "Jane Smith",
    profileImage: "https://example.com/jane-smith-profile.jpg"
  },
  {
    id: 3,
    name: "Michael Johnson",
    profileImage: "https://example.com/michael-johnson-profile.jpg"
  },
  {
    id: 4,
    name: "Emily Brown",
    profileImage: "https://example.com/emily-brown-profile.jpg"
  },
  // Add more persons as needed
];

function VotePage() {
  const [votedPerson, setVotedPerson] = useState(null);

  const handleVote = (personId) => {
    // Check if the user has already voted
    if (!votedPerson) {
      setVotedPerson(personId);
      // Here you can send the vote to your backend or perform any other necessary action
    } else {
      alert("You've already voted! You can't change your vote.");
    }
  };

  return (
    <div>
      <h2>Choose the saboteur</h2>
      {persons.map(person => (
        <div key={person.id}>
          <img src={person.profileImage} alt={person.name} />
          <p>{person.name}</p>
          <button onClick={() => handleVote(person.id)}>Vote</button>
        </div>
      ))}
    </div>
  );
}

export default VotePage;
