from waitress import serve
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

avatarURLs = ['https://i.postimg.cc/bvw5txrS/Screenshot-2024-02-19-at-09-51-18.png', 'https://i.postimg.cc/TwyHkTrR/Screenshot-2024-02-19-at-09-53-28.png', 'https://i.postimg.cc/zDgcKXz7/Screenshot-2024-02-19-at-09-53-32.png', 'https://i.postimg.cc/7h0tkXsd/Screenshot-2024-02-19-at-09-53-43.png', 'https://i.postimg.cc/259KF1Lc/Screenshot-2024-02-19-at-09-53-47.png', 'https://i.postimg.cc/TwZNFB9n/Screenshot-2024-02-19-at-09-53-50.png']

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
    

if __name__ == "__main__": 
      serve(app, host="0.0.0.0", port=8080)