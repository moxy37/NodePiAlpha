# NodePiAlpha
Very basic examples of how to interact with various plugins for a Pi.  Installing this will require first a imaged Pi for usage.  [Grab an image here](https://www.raspberrypi.org/downloads/), for my example I used the full Raspbian with Pixel image.  However Noob will work just as well.  The other images I've not tested however any Debian image should suffice.  
Once the image is installed load the Pi up and execute the following commands to ensure all software is installed correctly.

    sudo apt-get update --fix-missing
	curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash 
	sudo apt-get install -y nodejs 
	sudo apt-get install -y build-essential
	sudo apt-get install mysql-server --fix-missing
	git clone https://github.com/moxy37/NodePiAlpha.git alpha
	cd alpha
	sudo mysql -u root -proot
	create database alpha
	exit
	sudo mysql -u root -proot alpha < alpha.sql
	sudo node app.js

To start web system

    cd /home/pi/alpha
    sudo node app.js

Sample link to log data

    http://127.0.0.1/api/cow/log/51.332_-114.3_-56_b66a0f6f-487a-4073-8c0c-6242fd3a217b_37.2_34.2

Code to run python script open new terminal window

    python /home/pi/alpha/CowListener.py

To see database results open new terminal window

    sudo mysql -u root -proot alpha
    SELECT * FROM CowLog;

This will start a web-server running on port 80 on this pi.
