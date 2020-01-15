# Omnipresentation

## Quick Start

* `npm i`
* `npm run build`
* `npm start`
* http://localhost:8888

## Development Quick Start

* `npm run dev` (terminal 1)
* `npm run server` (terminal 2)
* `npm run remove` (terminal 3)
* Connect to ngrok provided URL in headset

It helps to have a "known" place to share the ngrok URL that is bookmarked in the headset's browser. I.e. Google Keep is a good way to share info between development computer and headset.

## Docker

Build the image

`docker build -t "omni-img" .`

Run the image (dev)

`docker run --rm -p 8888:8888 --name omni omni-img`

Run the image (prod)

`docker run -d --restart always --name omni -p 8888:8888 omni-img`

Debug the image

`docker exec -it omni /bin/bash`

Deploy Checklist

* npm install
* core: npm install
* core: npm run build
* apps: npm install
* apps: npm run build
* Docker: Build the image
* Docker: Run the image (production)
