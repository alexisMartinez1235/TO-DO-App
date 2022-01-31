ARG node_version

#
# Development
#
  FROM node:$node_version as dev
  WORKDIR /var/app/server

  # ADD ./TodoApp/ /var/app/ 
  VOLUME ./Server .
  # ADD ./Mysql/Installation/client-cert.pem /certs/client-cert.pem 

  # ADD ./Server/yarn.lock .
  ADD ./Server/package.json .
  
  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
          
  RUN sudo chown node:root -R /var/app/
  RUN sudo chown node:root -R /home/node/
  ###################

  RUN sudo yarn && sudo yarn build
  CMD yarn run dev | sleep 10000

#
# Production
#

  FROM node:$node_version as prod
  WORKDIR /var/app/server
  
  VOLUME ./Server .

  ADD ./Server/yarn.lock .
  ADD ./Server/package.json .

  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
          
  RUN sudo chown node:root -R /var/app/
  RUN sudo chown node:root -R /home/node/
  ###################

  # TODO: verify yarn = yarn install
  RUN sudo yarn && sudo yarn install --production && sudo yarn build

  CMD yarn run start

  