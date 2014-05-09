from flask import Flask, render_template, jsonify
import os, random
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html')
    
@app.route('/_get_random')
def get_random():
    sounds = os.listdir('static/sounds/items')
    choices = []
    
    while len(choices) < 6:
        to_add = random.choice(sounds)
        sounds.remove(to_add)
        choices.append(to_add[:-4]) #trim extension
    
    return jsonify(choices = choices)
    
if __name__ == '__main__':
    app.run(debug=True) 