#!/bin/bash

apt-get update
apt-get upgrade
apt -y install docker.io haproxy build-essentials
systemctl start docker
systemctl enable docker
# Firewall
ufw allow 22
ufw allow 80
ufw allow 443
ufw default deny incoming
ufw enable
# Node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
. ~/.profile
nvm install 12
# Omnipresent
git clone https://github.com/devpaul/omnipresent.git
cd omnipresent
npm install
cd packages/core
npm install
npm run build
cd ../client
npm install
npm run build
cd ../producer
npm install
npm run build
cd ../slides
npm install
cd ../server
npm install
cd ../..
npm run docker:build
# certbot
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get update
sudo apt-get install -y certbot
# https://serversforhackers.com/c/letsencrypt-with-haproxy
