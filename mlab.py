import mongoengine

# mongodb://<dbuser>:<dbpassword>@ds125342.mlab.com:25342/lazythinking

host = "ds125342.mlab.com"
port = 25342
db_name = "lazythinking"
user_name = "lazy1"
password = "lazy123"

#account mlab:
#name: lazythinking
#pass:c4e23lazythinking

def connect():
    mongoengine.connect(db_name, host=host, port=port, username=user_name, password=password)

def list2json(l):
    import json
    return [json.loads(item.to_json()) for item in l]

def item2json(item):
    import json
    return json.loads(item.to_json())