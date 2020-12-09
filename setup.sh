#!/bin/sh
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt update && sudo apt install node-typescript -y