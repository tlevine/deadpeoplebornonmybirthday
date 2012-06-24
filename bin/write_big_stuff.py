#!/usr/bin/env python2

import sys
from boto.s3.connection import S3Connection
from boto.s3.key import Key
import datetime
from copy import copy

FILE00 = sys.argv[1]
f = open(FILE00)
template = f.read()
f.close()

conn = S3Connection(sys.argv[2], sys.argv[3])
b = conn.get_bucket('www.deadpeoplebornonmybirthday.com')

def upload(birthday, content)
    k=Key(b)
    k.key=birthday
    k.content_type = 'text/html'
    k.set_contents_from_string(content)

def main():
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
 
        content = template.replace('______', params['birthday_words']).replace('0000-00-00', params['birthday'])
        upload(params['birthday'], content)
        print params['birthday']
        assert params['birthday'] in content
 
        # 1800s
        if birthday[:2] == '19':
            content18 = template.replace(
                '______',
                re.sub(r'19(\d\d)', '18\1', params['birthday_words'])
            ).replace(
               '0000-00-00',
                re.sub(r'19(\d\d)', '18\1', params['birthday'])
            )
            upload(re.sub(r'19', '18', params['birthday']), content18)
            assert params['birthday'] in content18

main()
