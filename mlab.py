import mongoengine

# mongodb://<dbuser>:<dbpassword>@ds235169.mlab.com:35169/lazydata

host = "ds235169.mlab.com"
port = 35169
db_name = "lazydata"
user_name = "test"
password = "test123"


def connect():
    mongoengine.connect(db_name, host=host, port=port, username=user_name, password=password)

def list2json(l):
    import json
    return [json.loads(item.to_json()) for item in l]


def item2json(item):
    import json
    return json.loads(item.to_json())