import pymongo

def people(birthday):
    'Generate a list of people for a given birthday'


def main():
    m = pymongo.Connection().middlenames.person
    m.ensure_index('born_date')
    min_birthday = m.find().sort('date_of_birth').limit(1)
