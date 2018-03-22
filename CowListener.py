#!/usr/bin/python

import serial
import string
import time
import sys

url = "http://127.0.0.1"

output = " "
latitude = '51.323'
longitude = '-114.213'
temp = '37.2'
cowId = 'b66a0f6f-487a-4073-8c0c-6242fd3a217b'
ser = serial.Serial('/dev/ttyUSB0', 9600, 8, 'N', 1, timeout=1)
while True:
    print "Reading"
    while output != "":
        output = ser.readline()
        output2 = cowId + '_' + latitude + '_' + longitude + '_' + temp
        print(output)
        try:
            some_url = url + '/api/cow/log/' + output2
            import urllib2
            f = urllib2.urlopen(some_url)
            print f.read()
        except:
            pass
