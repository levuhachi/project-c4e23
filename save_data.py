from flask import Flask,request,render_template, session, redirect, url_for
from models.lazydata import Lazy
import mlab

app = Flask(__name__)
mlab.connect()

@app.route("/lazythinking", methods = ["GET","POST"])
def lazythinking():
    if request.method == "GET":
        return render_template("save_data.html")
    elif request.method == "POST":
        form = request.form
        print(form)
        for i in form:
            print(i)
        # title = form["title"]

        # option = []
        # for k,v in form.items():
        #     print(k,v)
            # newoption = form["option"]
            # option.append(newoption)

        # new_option = Lazy(title = title, option = option)
        # new_option.save()
        return "Your choices have been saved"

    
if __name__ == '__main__':
  app.run(debug=True)