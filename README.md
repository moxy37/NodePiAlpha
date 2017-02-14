# NodePiAlpha
Very basic examples of how to interact with various plugins for a Pi.  Installing this will require first a imaged Pi for usage.  [Grab an image here](https://www.raspberrypi.org/downloads/), for my example I used the full Raspbian with Pixel image.  However Noob will work just as well.  The other images I've not tested however any Debian image should suffice.  
Once the image is installed load the Pi up and execute the following commands to ensure all software is installed correctly.

    sudo apt-get update --fix-missing
	sudo apt-get install mysql-server
	curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash 
	sudo apt-get install -y nodejs 
	sudo apt-get install -y build-essential
	sudo apt-get install mysql-server
	git clone https://github.com/moxy37/NodePiAlpha.git alpha
	cd alpha
	sudo mysql -u root -proot
	create database alpha
	exit
	sudo mysql -u root -proot alpha < alpha.sql
	sudo node app.js

This will start a web-server running on port 3002 on this pi.
