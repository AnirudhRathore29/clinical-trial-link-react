#!/bin/bash

#_Change_Working_Directory
cd /home/ubuntu/server

#_Update_&_Set_Node_Version
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -

#_Download_Node_&NPM
sudo apt install -y nodejs npm

#_Download_PM2
sudo npm install pm2@latest -g
