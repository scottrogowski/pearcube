# -*- coding: utf-8 -*-
import json

import pymongo 
from flask import render_template, abort

from orm import get_db
from utils import absolute_path, force_ascii

def load_flatfile():
    absolute = absolute_path('data/db.json')
    with open(absolute) as flatfile:
        return json.load(flatfile)

def sync_mongo_with_flatfile():
    # not very scalable but it will get the job done
    db = get_db()
    # db.products.remove( {} )
    flat_json = load_flatfile()
    for product_json in flat_json:
        try:
            db.products.update(
                {'page_url': product_json['page_url']},
                {'$set': product_json},
                upsert = True
                )
        except pymongo.errors.OperationFailure, e:
            print "mongo update failure"
            print e.code
            print force_ascii(e.details)

def render_product_page(dest):
    db = get_db()
    res = db.products.find_one({'page_url': dest})
    if res:
        return render_template('product_landing.html', **res)
    else:
        abort(404) # TODO http://flask.pocoo.org/docs/0.10/patterns/errorpages/
