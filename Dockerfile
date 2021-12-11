ARG node_version

FROM node:$node_version
COPY ./my-app/ /var/app/ 
WORKDIR /var/app/
EXPOSE 3000

# 525s
RUN npm install
# RUN (ls | grep node_modules ) && echo 'fdajfkdaflkadjfa'

# CMD ["npm", "start"]

# CMD npm start