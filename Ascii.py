#!/usr/bin/python

import serial
import string
import time
import sys
import urllib2

def StringToInt(x):
    y = 0
    if(x=='1'):
        y = 1
    elif(x=='2'):
        y = 2
    elif(x=='3'):
        y = 3
    elif(x=='4'):
        y = 4
    elif(x=='5'):
        y = 5
    elif(x=='6'):
        y = 6
    elif(x=='7'):
        y = 7
    elif(x=='8'):
        y = 8
    elif(x=='9'):
        y = 9
    elif(x=='A' or x=='a'):
        y = 10
    elif(x=='B' or x=='b'):
        y = 11
    elif(x=='C' or x=='c'):
        y = 12
    elif(x=='D' or x=='d'):
        y = 13
    elif(x=='E' or x=='e'):
        y = 14
    elif(x=='F' or x=='f'):
        y = 15
    return y

def ReturnInt(x):
    y = 0
    if(len(x)==2):
        y = 16*StringToInt(x[0]) + StringToInt(x[1])
    elif (len(x)==1):
        y = StringToInt(x[0])
    return y

def ReturnString(x):
    temp = x.split(' ')
    y = ''
    r = ' '
    try:
        for i in range(0, len(temp)):
            z = ReturnInt(temp[i])
            y = y + str(chr(z))
        temp1 = y.split('XXXXX')
        r = temp1[0]
    except:
        pass
    return r

url = 'http://' + sys.argv[1]
latitude = '51.323'
longitude = '-114.213'
temp1 = '37.2'
temp2 = '37.4'
cowid = '1'
rssi = '0'
ser = serial.Serial('/dev/ttyACM0', 9600, 8, 'N', 1, timeout=1)
oo = ' '
while True:
    while oo != "":
        try:
            oo = str(ser.readline())
            print(oo)
            output = ReturnString(oo)
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
