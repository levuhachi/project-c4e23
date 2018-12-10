from flask import Flask
import mlab

mlab.connect()
app = Flask(__name__)



if __name__ == '__main__':
  app.run(debug=True)