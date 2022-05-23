ARG node_version
#
# Development
#

FROM node:$node_version AS dev

  WORKDIR /var/app/client

  # ADD ./TodoApp/ /var/app/ 
  
  VOLUME ./Client /var/app/client
  # ADD ./Mysql/Installation/client-cert.pem /certs/client-cert.pem 
  
  # for See process
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
  RUN yarn global add react-scripts@4.0.3 typescript@4.6.4 @typescript-eslint/eslint-plugin@5.23.0
  # CMD yarn run build ; yarn run start
  
  CMD yarn run start || sleep 1000
  # CMD sleep 10000
#
# Production
#

FROM node:$node_version AS prod
  WORKDIR /var/app/client

  VOLUME ./Client /var/app/client
  
  ### USER CONFIG ###
  RUN apk add --update sudo

  RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node \
          && chmod 0440 /etc/sudoers.d/node
  RUN sudo chown node:root -R /home/node/
  ###################

  # ADD --chown=node:root ./Client/yarn.lock .
  ADD --chown=node:root ./Client/package.json .

  RUN yarn install --production  
  
  RUN yarn global add react-scripts@4.0.3 typescript@4.6.4
  CMD yarn run build && yarn run start
 
