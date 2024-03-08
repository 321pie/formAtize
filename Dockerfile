# Start your image with a node.js base image
#FROM scratch
FROM node:12.18.1

# Creator info
#MAINTAINER Andrew Rice <aprspie@gmail.com>

# The current directory should act as the main application directory
WORKDIR ./

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
#COPY ./src ./src
#COPY ./public ./public
COPY . .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    #&& npm run build \
    && rm -fr node_modules \
    #&& rm -fr ext_bin

EXPOSE 3000

# Start the app using serve command
CMD [ "serve", "-s", "build" ]