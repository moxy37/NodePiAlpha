import RPi.GPIO as g
#import Adafruit_BBIO.GPIO as g
import time
import sys

pin = int(sys.argv[1])
#pin = sys.argv[1]
status = sys.argv[2]

g.setmode(g.BOARD)
g.setwarnings(False)
g.setup(pin, g.OUT)
if str(status) == "1":
	g.output(pin, g.HIGH)
else:
	g.output(pin, g.LOW)
