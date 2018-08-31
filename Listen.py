#!/usr/bin/python

import serial
import string
import time
import sys


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
    return str(r)

url = "http://" + sys.argv[1] + ""
latitude = '51.323'
longitude = '-114.213'
temp1 = '37.2'
temp2 = '37.4'
cowid = '1'
rssi = '0'
output = " "
ser = serial.Serial('/dev/tty' + sys.argv[2], 9600, 8, 'N', 1, timeout=1)

while True:
    print("----")
    tempstr = ''
    while output != "":
        output = ser.readline()
        tempstr = tempstr + str(output)
    #print(tempstr)
    try:
        o = ReturnString(tempstr)
        #print(o)
        data = o.split(':')
        latitude = data[0]
        longitude = data[1]
        rssi = data[2]
        cowid = data[3]
        temp1 = data[4]
        temp2 = data[5]
        output2 = latitude + "_" + longitude + "_" + rssi + "_" + cowid + "_" + temp1 + "_" + temp2
        #print(output2)
        some_url = str(url + "/api/cow/log/" + output2)
        print(some_url)
        try:
            try:
                import urllib2 as urlreq # Python 2.x
            except:
                import urllib.request as urlreq # Python 3.x
            req = urlreq.Request(some_url)
            req.add_header('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36')
            urlreq.urlopen(req).read()
            #import urllib.request
            #contents = urllib.request.urlopen(some_url).read()
            
            #import requests
            #r = requests.get(some_url)
            #import httplib2
            #resp, content = httplib2.Http().request(some_url)
        except:
            try:
                import urllib2
                f = urllib2.urlopen(some_url)
                rr = f.read()
                print(str(rr))
            except:
                print("FAILED: "+ some_url)
    except:
        pass
    output = " "