#!/usr/bin/env python2
import sys, os
import datetime
from copy import copy

DIR = sys.argv[1]

def realdates():
    min_birthday = datetime.date(1900,1,1)
    birthday = copy(min_birthday)
    max_birthday = datetime.date.today()
    oneday = datetime.timedelta(days=1)
    'Starting at 1900'
    while birthday <= max_birthday:
        params = {
            'birthday_words': birthday.strftime('%B %d, %Y'),
            'birthday': birthday.strftime('%Y-%m-%d'),
        }
        if birthday != max_birthday:
            params['next'] = (birthday + oneday).strftime('%Y-%m-%d'),
        if birthday != min_birthday:
            params['prev'] = (birthday - oneday).strftime('%Y-%m-%d'),
 
        yaml = '''---
        birthday_words: '%(birthday_words)s'
        birthday: %(birthday)s
---
''' % params
        f = open(os.path.join(DIR, birthday.strftime('%Y-%m-%d.yaml')), 'w')
        f.write(yaml)
        f.close()
        birthday += oneday

def fakedates():
    'Before 1900'
    os.system('''
cd %s
rename 1900 1800 1900*.yaml
sed -i s/1900/1800/ 1800*.yaml
''' % DIR)

def main():
    realdates()
    fakedates()
    realdates()

main()
