from flask import Flask, render_template, request, session, redirect, url_for, jsonify
from flask_socketio import join_room, leave_room, send, SocketIO
import random
from waitress import serve
import os
import sys

async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode=async_mode)

avatarURLs = ['https://i.postimg.cc/25nzRzbX/1.png', 'https://i.postimg.cc/mkVB5tHQ/2.png', 'https://i.postimg.cc/MHzdGGr3/3.png', 'https://i.postimg.cc/9MLqGFQn/4.png', 'https://i.postimg.cc/fW5694jS/5.png', 'https://i.postimg.cc/mrHPPNvh/6.png']
existing_rooms = {}
current_working_directory = os.getcwd()
last_folder = os.path.basename(current_working_directory)      


# utility functions ########
def fetch_random_pirate_word():
    folder_name = os.path.basename(os.getcwd())
    print(folder_name)
    sys.stdout.flush() 

    
    file_path = (
        "./Backend/assets/pirate-vocab.txt"
        if folder_name == "team-pirate-game"
        else "./assets/pirate-vocab.txt"
    )

    try:
        with open(file_path, 'r') as file:
            random_line = random.choice(file.readlines())
            return random_line.strip()
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")

def generate_room_code():
    # need to make it so it doesn't use the same word twice\

    while True:
        code = ""
        code_first_word = fetch_random_pirate_word()
        code_second_word = fetch_random_pirate_word()
        
        code = f"{fetch_random_pirate_word()}{fetch_random_pirate_word()}"
        return code

def list_existing_rooms():
    print("\n******************** \navailable rooms:\n" + "\n".join([f"{room} -> members: {existing_rooms[room]['members']}" for room in existing_rooms]) + "\n********************\n")
    sys.stdout.flush() 
    socketio.emit("backend_list_existing_rooms", existing_rooms)
############################
    

# routes ###################
@app.route("/avatars", methods=["GET"])
def avatars():
    return jsonify(Avatars = avatarURLs)

@app.route("/hangmanPrompts", methods=["GET"])
def hangman():
    with open("./Back-end-Prompts/hangman-prompts.txt") as f:
        wordList = []
        for line in f:
            wordList.append(line.strip())
        return jsonify(HangmanPrompts = wordList)
    
@app.route("/pictionaryPrompts", methods=["GET"])
def pictionary():
    with open("./Back-end-Prompts/pictionary-prompts.txt") as f:
        wordList = []
        for line in f:
            wordList.append(line.strip())
        return jsonify(PictionaryPrompts = wordList)
    
@app.route('/', methods = ["POST", "GET"])
def home():

    # when user is at home page, their session credentials are purged
    sys.stdout.flush() 
    session.clear()

    if request.method == 'POST':
        name = request.form.get('name')
        code = request.form.get('code')

        join = request.form.get('join', False)
        create = request.form.get('create', False)

        # if no name provided
        if not name:
            return render_template('home.html', error='Enter a name.', code=code, name=name, async_mode=socketio.async_mode, existing_rooms=existing_rooms)
        
        # if trying to join a room with no room code
        if join != False and not code:
            return render_template('home.html', error='Enter a room code.', code=code, name=name, async_mode=socketio.async_mode, existing_rooms=existing_rooms)
    
        new_room = code

        # if creating room
        if create != False:
            new_room = generate_room_code()
            existing_rooms[new_room] = {"members": 0, "messages": []}
            list_existing_rooms()

        # else user must be joining a room
        # if the room not exist
        elif code not in existing_rooms:
            return render_template("home.html", error="Room does not exist", code=code, name=name, async_mode=socketio.async_mode, existing_rooms=existing_rooms)
        
        session["room"] = new_room
        session["name"] = name

        # redirect user to endpoint of the new or joined room
        return redirect(url_for("room"))

    return render_template("home.html", async_mode=socketio.async_mode, existing_rooms=existing_rooms)

# when directed to /room endpoint, render the room html template
@app.route("/room")
def room():
    room = session.get("room")

    # if room doesn't exist, or no room-code or name provided, return to home page
    if room is None or session.get("name") is None or room not in existing_rooms: return redirect(url_for("home"))

    return render_template("room.html", room_code=room, room_data = existing_rooms[room], async_mode=socketio.async_mode)
############################


# event handlers ###########
@socketio.on("connect")
def connect():

# get room and name from client session
    room = session.get("room")
    sys.stdout.flush() 
    name = session.get("name")

    # if no credentials provided don't proceed
    if not room or not name:
        return
    
# if the room is invalid leave the room
    if room not in existing_rooms:
        leave_room(room)
        return
    
#socket io function join_room and send
    # print(name, "has created room: ", room)

    join_room(room)
    send({'name': name, 'message': 'has joined the room'}, to=room)

#     # a user has joined the room
    existing_rooms[room]['members'] += 1
    print(name, "has joined room: ", room)
    sys.stdout.flush() 

    data={"name":name, "room":room}
    socketio.emit('join-room', data)

    list_existing_rooms()

@socketio.on("disconnect")
def disconnect():
    sys.stdout.flush() 
    room = session.get("room")
    name = session.get("name")
    leave_room(room)

    if room in existing_rooms:
        existing_rooms[room]["members"] -= 1

        # if room is empty just delete the room
        if existing_rooms[room]["members"] <= 0:
            del existing_rooms[room]

    send({'name': name, 'message': 'has left the room'}, to=room)
    print(name, "has left room", room)
    sys.stdout.flush() 

    data={"name":name, "room":room}
    socketio.emit('leave-room', data)
    list_existing_rooms()

@socketio.on("message")
def message(data):
    room = session.get("room")
    if room not in existing_rooms:
        return 
    
    content = {
    "name": session.get("name"),
    "message": data["data"],
    "room": room
    }
    send(content, to=room)
    existing_rooms[room]["messages"].append(content)
    print(f"Room {room} - {session.get('name')} said *** {data['data']} ***")

    sys.stdout.flush() 
    socketio.emit('send-message', content)
############################


# frontend event listeners
@socketio.on("frontend_create_room")
def frontend_create_room(data):

    # add new room_code to dictionary
    new_room = generate_room_code()
    existing_rooms[new_room] = {"members": 0, "messages": []}
    
    # add room and name to session data
    name = data["name"]

    session["room"] = new_room
    session["name"] = name

    join_room(new_room)

    print(name, "has created room: ", new_room)

    send({'name': name, 'message': 'has joined the room'}, to=new_room)

    # a user has joined the room
    existing_rooms[new_room]['members'] += 1
    print(name, "has joined room: ", new_room)
    sys.stdout.flush() 

# send to frontend toyshe
    data={"name":name, "room":new_room}
    socketio.emit('join-room', data)

    list_existing_rooms()



# clear the session!!!????

    socketio.emit('backend_terminal_message', new_room)

@socketio.on("frontend_join_room")
def fronted_join_room(data):

  # add room and name to session data
    name = data["name"]
    room = data["room"]

    print(name, "in the frontend is trying to join room:", room)
    sys.stdout.flush() 

    session["room"] = room
    session["name"] = name

# get room and name from client session
    room = session.get("room")
    name = session.get("name")

    # if the room is invalid leave the room
    if room not in existing_rooms:
        leave_room(room)
        return
    
    join_room(room)
    send({'name': name, 'message': 'has joined the room'}, to=room)

    # a user has joined the room
    existing_rooms[room]['members'] += 1
    print(name, "has joined room: ", room)
    sys.stdout.flush() 

    data={"name":name, "room":room}
    socketio.emit('join-room', data)

    list_existing_rooms()

@socketio.on("frontend_leave_room")
def frontend_leave_room(data):

    session["room"] = data["room"]
    session["name"] = data["name"]

    room = session.get("room")
    name = session.get("name")

    print(session, "<--- session data")
    sys.stdout.flush() 

    leave_room(room)

    if room in existing_rooms:
        existing_rooms[room]["members"] -= 1

    # if room is empty just delete the room
    if existing_rooms[room]["members"] <= 0:
        del existing_rooms[room]

    print(name, "has left room", room)

    list_existing_rooms()
    sys.stdout.flush() 

@socketio.on("frontend_send_message")
def message(data):

    session["room"] = data["room"]
    session["name"] = data["name"]
    session["message"] = data["message"]

    room = session.get("room")
    name = session.get("name")
    message = session.get("message")

    if room not in existing_rooms:
        return 
    
    message_content = {
    "name": name,
    "message": message,
    "room": room
    }
    
    send(message_content, to=room)

    existing_rooms[room]["messages"].append(message_content)
    print(f"Room {room} - {name} said *** {message} ***")

    sys.stdout.flush() 
    socketio.emit('backend_send_message', message_content)

@socketio.on("frontend_purge_existing_rooms")
def purge_existing_rooms():

    print("frontend is trying to purge rooms")
    sys.stdout.flush() 

    existing_rooms.clear()

    print("rooms purged")
    sys.stdout.flush() 
    list_existing_rooms() 
############################



#handle frontend canvas events
@socketio.on("frontend_canvas_mouse_click")
def frontend_canvas_mouse_click(data):
    print("mouse clicked", data)
    sys.stdout.flush() 
    socketio.emit('backend_canvas_mouse_click', "mouse clicked")


if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=8080, allow_unsafe_werkzeug=True)