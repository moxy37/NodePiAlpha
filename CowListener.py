#!/usr/bin/python

import serial
import string
import time
import sys
import urllib2

url = "http://127.0.0.1"

output = " "
latitude = '51.323'
longitude = '-114.213'
temp1 = '37.2'
temp2 = '37.4'
cowid = '1'
rssi = '0'
ser = serial.Serial('/dev/ttyACM0', 9600, 8, 'N', 1, timeout=1)
while True:
    while output != "":
        try:
            output = ser.readline()
            data = output.split(':')
            latitude = data[0]
            longitude = data[1]
            rssi = data[2]
            cowid = data[3]
            temp1 = data[4]
            temp2 = data[5]
            output2 = latitude + '_' + longitude + '_' + rssi + '_' + cowid + '_' + temp1 + '_' + temp2
            print(output2)
            try:
                some_url = url + '/api/cow/log/' + output2
                f = urllib2.urlopen(some_url)
                print f.read()
            except:
                pass
        except:
            print("Error")
