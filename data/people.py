import pymongo
from copy import copy
import datetime

m = pymongo.Connection().middlenames.person

def people(birthday):
    'Generate a list of people for a given birthday'
    out = []
    for person in m.find({'date_of_birth': birthday}):
        out.append({
        })

def main():
    m.ensure_index('born_date')
    min_birthday = m.find().sort('date_of_birth').limit(1)
    max_birthday = datetime.date.today()
    i = copy(min_birthday)
    while i < max_birthday:
        i += datetime.timedelta(days=1)
        people(i)
