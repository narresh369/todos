# backend/Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean npm cache and install dependencies
RUN rm -rf /root/.npm /app/node_modules && \
    npm cache clean --force && \
    npm install --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 5000

# Run app
CMD ["node", "index.js"]
