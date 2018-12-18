from mongoengine import *

class Lazy(Document):
    title = StringField()
    option = ListField()
    num_option = IntField()
    user = ReferenceField("User")