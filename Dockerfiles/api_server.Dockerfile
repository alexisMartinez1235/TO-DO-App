ARG node_version

#
# Development
#
FROM node:$node_version as dev
  WORKDIR /var/app/server

  # ADD ./TodoApp/ /var/app/ 
  # VOLUME ./Server .
  # ADD ./Mysql/Installation/client-cert.pem /certs/client-cert.pem 
  # See process
  RUN apk add htop

  # Needed by VsCode
  RUN apk add libstdc++

  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
          
  RUN sudo chown node:root -R /home/node/
  ###################

  ADD --chown=node:root ./Server/yarn.lock .
  ADD --chown=node:root ./Server/package.json .

  RUN yarn
  # CMD yarn run build ; yarn run dev
  CMD yarn run dev

#
# Production
#

FROM node:$node_version as prod
  WORKDIR /var/app/server
  
  # VOLUME ./Server .
  
  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
          
  RUN sudo chown node:root -R /home/node/
  ###################

  ADD --chown=node:root ./Server/yarn.lock .
  ADD --chown=node:root ./Server/package.json .

  RUN yarn install --production
  # RUN sudo chown node:root -R /var/app/

  CMD yarn run build && yarn run start

  
