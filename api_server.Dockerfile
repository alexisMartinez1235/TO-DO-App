ARG node_version

FROM node:$node_version as debug
# ADD ./TodoApp/ /var/app/ 
VOLUME ./Server/ /var/app/server
# ADD ./Mysql/Installation/client-cert.pem /certs/client-cert.pem 

WORKDIR /var/app/server

ADD ./Server/package.json /var/app/server
RUN npm install
CMD npm test
# RUN chown node:node -R /var/app/*

# USER node

FROM node:$node_version as prod
VOLUME ./Server/ /var/app/server

WORKDIR /var/app/server

ADD ./Server/package.json /var/app/server
RUN npm install

CMD npm start