#!/usr/bin/env python2

import datetime
import sys, os

from boto.s3.connection import S3Connection
from boto.s3.key import Key

conn = S3Connection(sys.argv[1], sys.argv[2])
b = conn.get_bucket('www.deadpeoplebornonmybirthday.com')

def upload(filename, birthday):
    # Test that it's a date.
    datetime.date(*map(int, birthday.replace('18', '19').split('-')))

    k=Key(b)
    k.key=birthday
    k.content_type = 'text/html'
    k.content_encoding = 'gzip'
    k.storage_class='REDUCED_REDUNDANCY'

    content = open(filename)
    k.set_contents_from_file(content)
    content.close()

def main():
    for jsongz in os.listdir(os.path.join('data', 'people')):
        filename = os.path.join('data', 'people', jsongz)
        birthday = jsongz.replace('.json.gz', '')
        upload(filename, birthday)
        print filename, birthday
        break

main()
