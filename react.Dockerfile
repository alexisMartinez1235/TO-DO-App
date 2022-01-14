ARG node_version

FROM node:$node_version AS debug
# ADD ./TodoApp/ /var/app/ 
VOLUME ./Client/ /var/app/client
# ADD ./Mysql/Installation/client-cert.pem /certs/client-cert.pem 

WORKDIR /var/app/client

ADD ./Client/package.json /var/app/client
RUN npm install
# RUN chown node:node -R /var/app/*
CMD npm start
# USER node

FROM node:$node_version AS prod
VOLUME ./Client/ /var/app/client

WORKDIR /var/app/client

ADD ./Client/package.json /var/app/client
RUN npm install
CMD npm start

