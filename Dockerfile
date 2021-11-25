FROM node:14-alpine
WORKDIR /var/app/
# COPY package.json .
RUN npm install 
# COPY . . 
# EXPOSE 3000
CMD [ "npm", "start" ]    
# CMD node --inspect=0.0.0.0 /var/app/src/index.js