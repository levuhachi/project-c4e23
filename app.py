from flask import Flask, render_template, session, request
import mlab
from models.user import User

mlab.connect()
app = Flask(__name__)
app.config["SECRET_KEY"] = "ABC"

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "GET":
        return render_template("login.html")
    else:
        form = request.form
        u = form["username"]
        p = form["password"]
        found_user = User.objects(username=u).first()
        if found_user == None:
            return "No such user!!"
        else:
            if found_user["password"] == p:
                session["token"] = u
                return "Welcome!!!"
            else:
                return "Wrong password"

@app.route("/sign_up", methods=["GET", "POST"])
def sign_up():
    if request.method == "GET":
        return render_template("sign_up.html")
    else:
        form = request.form
        u = form["username"]
        p = form["password"]
        exist_user = User.objects(username=u).first()
        if exist_user != None:
            return "User already exist !!!!"
        else:
            m = User(username=u, password=p)
            m.save()
            return "Sign up successful" 

if __name__ == "__main__":
    app.run(debug=True)