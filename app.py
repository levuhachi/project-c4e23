from flask import Flask, render_template, session, request, redirect, url_for
import mlab
from models.user import User
from models.lazydata import Lazy

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
            return redirect(url_for("sign_up"))
        else:
            if found_user["password"] == p:
                session["token"] = u
                return redirect(url_for("lazythinking"))
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
            return render_template("sign_up_successful.html") 

@app.route("/lazythinking", methods = ["GET","POST"])
def lazythinking():
    if request.method == "GET":
        return render_template("save_data.html")
    elif request.method == "POST":
        form = request.form
        title = form["title"]
        option = []
        for k,v in form.items():
            if k != "title":
                newoption = v
                option.append(newoption)
        new_option = Lazy(title = title, option = option)
        new_option.save()
        return "Your choices have been saved"

if __name__ == "__main__":
    app.run(debug=True)