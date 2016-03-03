import pymongo

import options
from secrets import MLAB_USERNAME, MLAB_PASSWORD

# Connection to Mongo DB
try:
    if options.DEBUG
        client = pymongo.MongoClient()
    else:
        uri = "mongodb://%s:%s@ds019658.mlab.com:19658/heroku_2wzxbwzm" % (MLAB_USERNAME, MLAB_PASSWORD)
        client = pymongo.MongoClient(uri)
    print "Connected successfully to mongo"
except pymongo.errors.ConnectionFailure, e:
   print "Could not connect to MongoDB: %s" % e 
   exit(1)

db = client.db