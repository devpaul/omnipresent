FROM node:12

COPY packages/client/output/dist /srv/client/output/dist
COPY packages/core/dist/esm /srv/core/dist/esm
COPY packages/producer/output/dist /srv/producer/output/dist
COPY packages/server /srv/server
COPY packages/slides /srv/slides

WORKDIR /srv/slides
RUN ["npm", "install"]

WORKDIR /srv/server
RUN ["npm", "install"]
CMD ["npm", "start"]
