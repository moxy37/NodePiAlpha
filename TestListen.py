#!/usr/bin/python

import serial, string

output = " "
ser = serial.Serial('/dev/ttyACM0', 9600)
print("Starting")
while True:
	while output != "":
		
		
		output = ser.readline()
		output = output[:-2]
		o = output.split(' ')
		lat = ''
		lon = ''
		print(o)
		for x in range(0, len(o)):
			if o[x] != '':
				if lat == '':
					lat = o[x]
				else:
					lon = o[x]
		print(lat)
		print(lon)