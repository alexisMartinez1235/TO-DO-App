ARG node_version

FROM node:$node_version
COPY ./my-app/ /var/app/ 
WORKDIR /var/app/
RUN npm install



