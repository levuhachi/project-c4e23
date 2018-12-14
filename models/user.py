from mongoengine import Document, StringField, ListField

class User(Document):
    username = StringField()
    password = StringField()
    options = ListField()