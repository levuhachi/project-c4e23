import mongoengine

# mongodb://admin:admin1@ds139690.mlab.com:39690/movies

host = "ds139523.mlab.com"
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