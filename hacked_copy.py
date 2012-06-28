#!/usr/bin/env python2

import datetime
import sys, os
import dumptruck

from boto.s3.connection import S3Connection
from boto.s3.key import Key

conn = S3Connection(sys.argv[1], sys.argv[2])
b = conn.get_bucket('www.deadpeoplebornonmybirthday.com')

os.system('rm /tmp/s3_copy_log.sqlite')
dt = dumptruck.DumpTruck(dbname = '/tmp/s3_copy_log.sqlite')

HEADERS = {
    'Content-Type': 'application/json',
    'Content-Encoding': 'gzip',
}

def upload(filename, birthday):
    # Test that it's a date.
    datetime.date(*map(int, birthday.replace('18', '19').split('-')))

    k=Key(b)
    k.key=os.path.join('data', 'bornon', birthday + '.json.gz')
    k.storage_class='REDUCED_REDUNDANCY'

    f = open(filename)
    key.set_contents_from_string(f.read(), HEADERS, replace=True)
    f.close()

    k.close()

def main():
    for jsongz in os.listdir(os.path.join('data', 'people')):
        filename = os.path.join('data', 'people', jsongz)
        birthday = jsongz.replace('.json.gz', '')
        upload(filename, birthday)
        dt.insert({'filename': filename, 'birthday': birthday}, 'finished')
        break

#main()
upload('data/people/2000-01-01.json.gz', '2000-01-01')
