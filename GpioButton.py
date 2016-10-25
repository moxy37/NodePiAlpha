import RPi.GPIO as g
import time
import sys
#import httplib

url = "http://127.0.0.1:3002"
pin = int(sys.argv[1])
status = sys.argv[2]
index = 0

while True:
	index = index + 1
	g.setmode(g.BOARD)
	g.setwarnings(False)
	g.setup(pin, g.IN, pull_up_down=g.PUD_UP)
	print "Waiting for falling edge on port with index " + str(index)
	# now the program will do nothing until the signal on port 23   
	# starts to fall towards zero. This is why we used the pullup  
	# to keep the signal high and prevent a false interrupt  
	  
	print "During this waiting time, your computer is not"   
	print "wasting resources by polling for a button press.\n"  
	print "Press your button when ready to initiate a falling edge interrupt."  
	try:  
		g.wait_for_edge(pin, g.FALLING)  
		print("Button Pressed")
		some_url = url + '/'+status+'/'+str(pin)
		import urllib2
		f = urllib2.urlopen(some_url)
		print f.read()
		#conn = httplib.HTTPConnection(url)
		#r = status + '/'+str(pin)
		#conn.request("GET", r)
		#response = conn.getresponse()
		#result = response.read()
		#conn.close()
		#print(result)
		time.sleep(1)
	except KeyboardInterrupt:  
		g.cleanup()       # clean up GPIO on CTRL+C exit  
	g.cleanup()           # clean up GPIO on normal exit  
