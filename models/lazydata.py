from mongoengine import *

class Lazy(Document):
    title = StringField()
    option = ListField()
    user = ReferenceField("User")