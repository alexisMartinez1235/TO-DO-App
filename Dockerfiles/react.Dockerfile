ARG node_version
#
# Development
#

FROM node:$node_version AS dev

  WORKDIR /var/app/client

  # ADD ./TodoApp/ /var/app/ 
  # VOLUME ./Client .
  # ADD ./Mysql/Installation/client-cert.pem /certs/client-cert.pem 
  
  # See process
  RUN apk add htop

  # Needed by VsCode
  RUN apk add libstdc++
  
  ### USER CONFIG ###
  RUN apk add --update sudo
  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
          
  RUN chown node:root -R /home/node/
  ###################i

  # ADD --chown=node:root ./Client/yarn.lock .
  ADD --chown=node:root ./Client/package.json .
  
  RUN yarn
  RUN mkdir -p node_modules/.cache && chown -R node:root node_modules/.cache

  RUN yarn global add react-scripts
  # CMD yarn run build ; yarn run start
  
  CMD yarn run start
  
#
# Production
#

FROM node:$node_version AS prod
  WORKDIR /var/app/client

  # VOLUME ./Client .
  
  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
  RUN sudo chown node:root -R /home/node/
  ###################

  # ADD --chown=node:root ./Client/yarn.lock .
  ADD --chown=node:root ./Client/package.json .

  RUN yarn install --production  
  RUN yarn global add react-scripts
  
  CMD yarn run build && yarn run start
 
