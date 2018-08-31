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

output = " "
ser = serial.Serial('/dev/tty' + sys.argv[1], 9600, 8, 'N', 1, timeout=1)
while True:
    print("----")
    while output != "":
        output = ser.readline()
        print(output)
    output = " "