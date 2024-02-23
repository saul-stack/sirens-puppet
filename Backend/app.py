from waitress import serve
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="*")

avatarURLs = ['https://i.postimg.cc/25nzRzbX/1.png', 'https://i.postimg.cc/mkVB5tHQ/2.png', 'https://i.postimg.cc/MHzdGGr3/3.png', 'https://i.postimg.cc/9MLqGFQn/4.png', 'https://i.postimg.cc/fW5694jS/5.png', 'https://i.postimg.cc/mrHPPNvh/6.png']

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