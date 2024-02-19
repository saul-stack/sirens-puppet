from flask import Flask, jsonify

app = Flask(__name__)
avatarURLs = ['https://i.postimg.cc/bvw5txrS/Screenshot-2024-02-19-at-09-51-18.png', 'https://i.postimg.cc/TwyHkTrR/Screenshot-2024-02-19-at-09-53-28.png', 'https://i.postimg.cc/zDgcKXz7/Screenshot-2024-02-19-at-09-53-32.png', 'https://i.postimg.cc/7h0tkXsd/Screenshot-2024-02-19-at-09-53-43.png', 'https://i.postimg.cc/259KF1Lc/Screenshot-2024-02-19-at-09-53-47.png', 'https://i.postimg.cc/TwZNFB9n/Screenshot-2024-02-19-at-09-53-50.png']

@app.route("/avatars", methods=["GET"])
def avatars():
    return jsonify(Avatars = avatarURLs)

if __name__ == "__main__": app.run(debug = True)