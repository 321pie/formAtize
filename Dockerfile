# Use an official Node.js image with a specific version
FROM node:14

# Set the working directory inside the container
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 8000

# Command to run your application
CMD ["npm", "start"]
