ARG node_version
#
# Development
#

  FROM node:$node_version AS dev

  WORKDIR /var/app/client

  # ADD ./TodoApp/ /var/app/ 
  VOLUME ./Client .
  # ADD ./Mysql/Installation/client-cert.pem /certs/client-cert.pem 

  ADD ./Client/yarn.lock .
  ADD ./Client/package.json .

  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
          
  RUN sudo chown node:root -R /var/app/
  RUN sudo chown node:root -R /home/node/
  ###################
  RUN sudo yarn && sudo yarn build

  CMD yarn run start | sleep 10000
#
# Production
#

  FROM node:$node_version AS prod
  WORKDIR /var/app/client

  VOLUME ./Client .

  ADD ./Client/yarn.lock .
  ADD ./Client/package.json .

  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
          
  RUN sudo chown node:root -R /var/app/
  RUN sudo chown node:root -R /home/node/
  ###################

  RUN sudo yarn && sudo yarn install --production && sudo yarn build
  CMD yarn run start
