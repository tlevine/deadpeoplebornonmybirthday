#!/usr/bin/env python2

min_birthday = datetime.date(1800,1,1)
birthday = copy(min_birthday)
max_birthday = datetime.date(1800, 1, 22)
oneday = datetime.timedelta(days=1)

while birthday <= max_birthday:
    params = {
        'birthday_words': = birthday.strftime('%B %d, %Y'),
        'birthday': = birthday.strftime('%Y-%m-%d'),
    }
    if birthday != min_birthday:
        params['next'] = (birthday + oneday).strftime('%Y-%m-%d'),
    if birthday != max_birthday:
        params['prev'] = (birthday - oneday).strftime('%Y-%m-%d'),

    print '''---
    birthday_words: '%(birthday_words)s'
    birthday: %(birthday)s
    ---''' % params
    birthday += oneday
