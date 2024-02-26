# Game Overview

Welcome to Siren's Wrath! In this game, the crew of a pirate ship finds themselves navigating a storm in treacherous waters, working together to safely reach shore.

However, there's a twist - among the crew members lurks a traitor, seduced by a siren's call to bring the ship crashing to the ocean floor, damning the crew to a watery grave. This is the Siren's Puppet.

## Gameplay

### Siren's Puppet (Imposter)
As the Siren's Puppet, your mission is to sabotage the voyage without raising suspicion. You'll subtly disrupt the ship's course, making "errors in judgment" that lead it into danger. You can realize this diabolical plan in multiple ways, such as blowing out the ship's candles, shaking the table, or spilling ink on the map.

### Identifying the Imposter and Casting Suspicion
The crew must pay close attention to the behavior of their fellow shipmates, as this traitor wants nothing more than to see them perish. When something seems off about a member of the crew, they must report their suspicions. However, they must be wary - the Siren's Puppet may try to manipulate the discussion and divert suspicion away from themselves. Ultimately, the crew must decide who to throw overboard to save their ship.

## Technologies Used

We utilized a variety of front and back-end technologies to build the game, including:

- **Python Flask**: Utilized for the backend framework, implementing game mechanics and logic, managing game state, and handling server-side logic.

- **SocketIO**: Facilitates real-time communication between players through live-chat and communicates gameplay data (visual display of mini-games and results).

- **React & JavaScript**: Powers the frontend, providing an interactive user interface and dynamic updates, event handling, client-side validation, and sending requests to the backend server.

- **HTML/CSS**: Used for frontend styling.


- **Docker** *why did we use docker? for deployment purposes*

## Development Process

- **Trello**: *mention planning tasks, minimum viable product, blockers*

- **Spiking**: *what new tech did we use? why choose this?*

- **RATS**: *what were out riskiest assumptions? socketio probably the main one*

## Getting Started

To embark on your own voyage, visit [https://pirate-game-react.onrender.com](https://pirate-game-react.onrender.com)

Alternatively, the game can be run from a local server, and be accessed by other devices on the same network (LAN party).

To run the game from a local server:

1. **Clone the Repository**: Clone the repository to your local machine and navigate to the directory. 
        
        $ git clone https://github.com/saul-stack/team-pirate-game
        $ cd team-pirate-game


1. **Install Dependencies**: Navigate to the project directory and install dependencies for both the frontend and backend. 
   
        $ pip install -r requirements.txt
        $ npm install

2. **Run the Server**: Start the Flask server to run the backend of the game. 
   
        $ python3 app.py

3. **Launch the Frontend**: Open another terminal window/tab, navigate to the project directory, and start the frontend server.

        $ cd Frontend
        $ npm run dev

4. **Access the Game**: Visit `http://localhost:5173` in your web browser to access the game and begin playing.
5. **Join with another device**
The front and back end are accessible through local area network. 
Visit the address labelled "Network" in the browser of another device to access the game.



## Advanced: Quick-start- Ubuntu Linux only

 *start_game.sh* and *end_game.sh*, are shell scripts to manage these operations and handle port closure. Proceed with caution when utilizing these scripts to prevent disturbing other processes which may be running on the port.

        $ chmod +x start_game.sh end_game.sh

To start the game:

        $ ./start_game.sh

To end the game:

        $ ./end_game.sh


<!-- # Extra points to mention:
hosted on render
js console.log() and python print()
python print() buffer flush
event handling with socket
 -->
