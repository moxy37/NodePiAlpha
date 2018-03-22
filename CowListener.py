#!/usr/bin/python

import serial
import string
import time
import sys

url = "http://127.0.0.1:3001"

output = " "
ser = serial.Serial('/dev/ttyUSB0', 9600, 8, 'N', 1, timeout=1)
while True:
    print "Reading"
    while output != "":
        output = ser.readline()
        print(output)
        try:
            some_url = url + '/cow_result/' + output
            import urllib2
            f = urllib2.urlopen(some_url)
            print f.read()
        except:
            pass
