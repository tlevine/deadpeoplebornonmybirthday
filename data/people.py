import os
import pymongo
import json
from copy import copy
import datetime

m = pymongo.Connection().middlenames.person

def people(birthday_date):
    'Generate a list of people for a given birthday'
    # Datetimes can convert to BSON.
    birthday = datetime.datetime.combine(birthday_date, datetime.time())

    out = []
    for person in m.find({'born_date': birthday}):
        out.append({
            "ssn": person['ssn'],
            "first": person.get('forename', ''),
            "middle": ' '.join(person['middles']),
            "last": person['surname'],
            "date_of_death": person['died_date'].date().isoformat(),
            "state": person['state'],
        })
    return out

def main():
    m.ensure_index('born_date')
    doc = m.find({'born_date': {'$ne': None}}).sort('born_date').limit(1)[0] 
    min_birthday = doc['born_date'].date()
    max_birthday = datetime.date.today()
    i = copy(min_birthday) - datetime.timedelta(days=1)
    while i < max_birthday:
        i += datetime.timedelta(days=1)
        print(i)
        filename = os.path.join('people', '%s.json' % i.isoformat())

        # Skip the ones that are finished
        if os.path.exists(filename):
            continue

        else:
            contents = json.dumps(people(i))
            f = open(filename, 'w')
            f.write(contents)
            f.close()


if __name__ == "__main__":
    main()
