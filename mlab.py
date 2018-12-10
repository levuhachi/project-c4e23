import mongoengine

# mongodb://<dbuser>:<dbpassword>@ds139523.mlab.com:39523/project-c4e

host = "ds139690.mlab.com"
port = 39523
db_name = "project-c4e"
user_name = "admin"
password = "admin1"


def connect():
    mongoengine.connect(db_name, host=host, port=port, username=user_name, password=password)

def list2json(l):
    import json
    return [json.loads(item.to_json()) for item in l]

def item2json(item):
    import json
    return json.loads(item.to_json())