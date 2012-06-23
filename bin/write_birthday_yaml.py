#!/usr/bin/env python2
import sys, os
import datetime
from copy import copy

DIR = sys.argv[1]
f = open(os.path.join(DIR, '0000-00-00', 'index.html'))
template = f.read()
f.close()

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
 
        os.mkdir(os.path.join(DIR, birthday.strftime('%Y-%m-%d')))
        f = open(os.path.join(DIR, birthday.strftime('%Y-%m-%d'), 'index.html'), 'w')
        content = template.replace('______', params['birthday_words']).replace('0000-00-00', params['birthday'])
        f.write(content)
        f.close()
        birthday += oneday

def fakedates():
    'Before 1900'
    os.system('''
cd %s
rename 1900 1800 1900*
sed -i s/1900/1800/ 1800*
''' % DIR)

def main():
    realdates()
    fakedates()
    realdates()

main()
