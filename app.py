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
            return redirect(url_for("lazythinking"))
        else:
            m = User(username=u, password=p)
            m.save()
            # return render_template("sign_up_successful.html") 
            return redirect(url_for('lazythinking'))

@app.route("/", methods = ["GET","POST"])
def lazythinking():    
    if request.method == "GET":
        if "token" in session:
            username = session["token"]
            user = User.objects(username = username).first()
            lazy = Lazy.objects(user = user)
            return render_template("save_data.html", lazy = lazy, numQuestion = len(lazy))
        else:
            return redirect(url_for('login'))
    elif request.method == "POST":
        form = request.form
        title = form["title"]
        option = []
        for k,v in form.items():
            if k != "title":
                newoption = v
                option.append(newoption)
        username = session["token"]
        user = User.objects(username = username).first()
        new_option = Lazy(title = title, option = option, num_option = len(option),user = user)
        new_option.save()
        return redirect(url_for('lazythinking'))

@app.route('/delete/<id>')
def deleteQuestion(id):
    question = Lazy.objects.with_id(id)
    question.delete()
    return redirect(url_for('lazythinking'))

@app.route("/logout")
def logout():
    if "token" in session:
        del session["token"] 
    return redirect("login")



if __name__ == "__main__":
    app.run(debug=True)