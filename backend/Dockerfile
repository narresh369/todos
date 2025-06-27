# Use a Node.js base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /

# Copy only package files (for better layer caching)
COPY package*.json ./

# Clean cache (optional but helpful in some cases) and install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application
COPY . .

# Expose your server port
EXPOSE 5000

# Run the server
CMD ["node", "index.js"]
