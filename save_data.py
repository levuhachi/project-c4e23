from flask import Flask,request,render_template, session, redirect, url_for
from models.user import User
from models.movie import Movie
import mlab
app = Flask(__name__)
mlab.connect()

@app.route("/datainput", methods = ["GET","POST"])
def add_movie():
    if "token" not in session:
        return redirect("/login")
    if request.method == "GET":
        return render_template("save_data.html")
    elif request.method == "POST":
        form = request.form
        title = form["title"]
        option = form["option"]
        username = session["token"]
        options = Option.objects(username = username).first()
        new_option = Option(title = title, option = option)
        new_option.save()
        return "Ok"

    

if __name__ == '__main__':
  app.run(debug=True)