# # Start your image with a node.js base image
# #FROM scratch
# FROM node:12.18.1

# # Creator info
# #MAINTAINER Andrew Rice <aprspie@gmail.com>

# # The current directory should act as the main application directory
# WORKDIR ./

# # Copy the app package and package-lock.json file
# COPY package*.json ./

# # Copy local directories to the current local directory of our docker image (/app)
# #COPY ./src ./src
# #COPY ./public ./public
# COPY . .

# # Install node packages, install serve, build the app, and remove dependencies at the end
# RUN npm install \
#     && npm install -g serve \
#     #&& npm run build \
#     && rm -fr node_modules \
#     #&& rm -fr ext_bin

# EXPOSE 3000

# # Start the app using serve command
# CMD [ "serve", "-s", "build" ]

# Use an official Node.js image with a specific version
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies including react-scripts
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
