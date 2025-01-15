# Backend Dockerfile
FROM node:18-alpine

# working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 5000

# Command to run the server in development
CMD ["npm", "run", "dev"]
