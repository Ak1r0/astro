# sources :
#  - https://nodejs.org/fr/docs/guides/nodejs-docker-webapp/
#  - https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f

FROM node:17 as base

# Create app directory
WORKDIR /usr/src/server

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

#EXPOSE 8080
#CMD [ "npm", "run", "build" ]
