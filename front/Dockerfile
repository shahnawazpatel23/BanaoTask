# Use Node.js to build the app
FROM node:18-alpine AS builder

# working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Use a lightweight Nginx server to serve the files
FROM nginx:stable-alpine

# Copy the build output to Nginx's default public directory
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expose the port for the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
