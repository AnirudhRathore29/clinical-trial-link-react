#!/bin/bash

cd /home/ubuntu/server

# install dependencies
npm install --legacy-peer-deps

# install create-react-app and react-scripts
# without react-scripts application cannot be started
npm install --save create-react-app react-scripts

# install pm2 process manager
npm install pm2 -g
