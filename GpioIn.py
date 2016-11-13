import RPi.GPIO as g
import time
import sys
#import httplib

url = "http://127.0.0.1"
pin = int(sys.argv[1])
statusHigh = sys.argv[2]
statusLow = ''
statusData = ''
if len(sys.argv) > 3:
    statusLow = sys.argv[3]
if len(sys.argv) > 4:
    statusData = sys.argv[4]
index = 0
g.setmode(g.BOARD)
g.setwarnings(False)
g.setup(pin, g.IN)
while True:
    index = g.input(pin)
    print("index is " + str(index))
    if index == 1:
        try:
            print("Input High")
            some_url = url + '/'+statusHigh +'/'+str(pin)
            import urllib2
            f = urllib2.urlopen(some_url)
            print f.read()
        except:
            pass
    elif index == 0 and statusLow != '':
        try:
            print("Input High")
            some_url = url + '/'+statusLow +'/'+str(pin)
            import urllib2
            f = urllib2.urlopen(some_url)
            print f.read()
        except:
            pass
    elif statusData != '':
        try:
            print("Input High")
            some_url = url + '/'+statusData+'/'+str(pin)
            import urllib2
            f = urllib2.urlopen(some_url)
            print f.read()
        except:
            pass
        
    time.sleep(1)