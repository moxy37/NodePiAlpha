#!/usr/bin/python

import serial, string, sys

output = " "
ser = serial.Serial('/dev/tty' + sys.argv[1], 9600, 8, 'N', 1, timeout=1)
while True:
    print("----")
    while output != "":
        output = ser.readline()
        print(output)
        output = " "