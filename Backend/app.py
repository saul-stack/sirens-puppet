from flask import Flask, render_template, request, session, redirect, url_for
from flask_socketio import join_room, leave_room, send, SocketIO
import random
from waitress import serve
import os
import sys

# 
async_mode = None
# 

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*", async_mode=async_mode)

# dictionary of exisiting rooms
existing_rooms = {}

current_working_directory = os.getcwd()
last_folder = os.path.basename(current_working_directory)      

def fetch_random_pirate_word():
    folder_name = os.path.basename(os.getcwd())
    file_path = (
        "./Backend/assets/pirate-vocab.txt"
        if folder_name == "pirate-game-react"
        else "./assets/pirate-vocab.txt"
    )

    try:
        with open(file_path, 'r') as file:
            random_line = random.choice(file.readlines())
            return random_line.strip()
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")

# need to make it so it doesn't use the same word twice\
def generate_room_code():
    while True:
        code = ""
        code_first_word = fetch_random_pirate_word()
        code_second_word = fetch_random_pirate_word()
        
        code = f"{fetch_random_pirate_word()}{fetch_random_pirate_word()}"
        return code

@app.route('/', methods = ["POST", "GET"])
def home():

    # when user is at home page, their session credentials are purged
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
            existing_rooms[new_room] = {"members": 0, "messages": [], "users": []}
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

@socketio.on("connect")
# # currently not using auth variable
# def connect(auth):
def connect():
    list_existing_rooms()

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



# frontend event listeners
@socketio.on("frontend_create_room")
def frontend_create_room(data):

    # add new room_code to dictionary
    new_room = generate_room_code()
    existing_rooms[new_room] = {"members": 0, "messages": [], "users": []}
    
    # add room and name to session data
    name = data["name"]

    session["room"] = new_room
    session["name"] = name

    join_room(new_room)

    print(name, "has created room: ", new_room)

    send({'name': name, 'message': 'has joined the room'}, to=new_room)

    # a user has joined the room
    existing_rooms[new_room]['members'] += 1
    existing_rooms[new_room]['users'].append(name)
    print(name, "has joined room: ", new_room)
    sys.stdout.flush() 

    usersList = existing_rooms[new_room]['users']

# send to frontend toyshe
    data={"name":name, "room":new_room, "users": usersList}
    print(data)
    socketio.emit('join-room', data)

    list_existing_rooms()

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
    
    if name in existing_rooms[room]['users']:
        send({'name is already taken'}, to=room)
        return

    join_room(room)
    send({'name': name, 'message': 'has joined the room'}, to=room)

    # a user has joined the room
    existing_rooms[room]['members'] += 1
    existing_rooms[room]['users'].append(name)

    usersList = existing_rooms[room]['users']
    print(name, "has joined room: ", room)
    sys.stdout.flush() 

    print(existing_rooms[room])
    sys.stdout.flush() 


    data={"name":name, "room":room, 'users': usersList}
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


@socketio.on("frontend_send_users")
def send_users_in_room(data):

    print("backend is trying to send the users in the room")
    sys.stdout.flush()

    room = data['room']
    content = {
        "room": room, "users": existing_rooms[room]['users']
    }
    socketio.emit("backend_send_users", existing_rooms[room]['users'])

    print(existing_rooms[room]['users'])
    sys.stdout.flush()
    

def list_existing_rooms():
    print("\n******************** \navailable rooms:\n" + "\n".join([f"{room} -> members: {existing_rooms[room]['members']}" for room in existing_rooms]) + "\n********************\n")
    sys.stdout.flush() 
    socketio.emit("backend_list_existing_rooms", existing_rooms)


#handle frontend canvas events
@socketio.on("frontend_canvas_mouse_click")
def frontend_canvas_mouse_click():
    # print("mouse clicked", data)
    # sys.stdout.flush() 
    socketio.emit('backend_canvas_mouse_click')

@socketio.on("frontend_canvas_mouse_release")
def frontend_canvas_mouse_release():
    # print("mouse released", data)
    # sys.stdout.flush() 
    socketio.emit('backend_canvas_mouse_release')

@socketio.on("frontend_canvas_mouse_move")
def frontend_canvas_mouse_move(data):
    # print("mouse moved", data)
    # sys.stdout.flush() 
    socketio.emit('backend_canvas_mouse_move', data)

@socketio.on('frontend_canvas_rotate')
def rotate():
    print("frontend is rotating canvas")
    # sys.stdout.flush() 
    socketio.emit('backend_canvas_rotate')


@socketio.on('frontend_start_game')
def start_game():
    print("start game from frontend")
    sys.stdout.flush()

    socketio.emit("backend_start_game")

@socketio.on("front-end-randomPrompt")
def randomPrompt(data):
    prompt = data['prompt']
    print(prompt)
    sys.stdout.flush()

    content = {'prompt': prompt}

    socketio.emit("backend-randomPrompt", content)
  

@socketio.on("frontend-lives")
def lives(data):
    lives = data['lives']
    win = data['win']
    lose = data['lose']

    print(lives, win, lose)
    sys.stdout.flush()

    content = {'lives': lives, 'win': win, 'lose': lose}
    socketio.emit("backend_lives", content)  


@socketio.on("frontend_saboteur")
def saboteur(data):
    saboteur = data['saboteur']

    print(saboteur)
    sys.stdout.flush()

    content = {'saboteur': saboteur}

    socketio.emit("backend_saboteur", content)

if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0", port=8080, allow_unsafe_werkzeug=True)