FROM node:18-alpine

# Set working directory
WORKDIR /

# Clean and copy only necessary files first
COPY package*.json ./

# Clean npm cache and use safe install mode
RUN rm -rf /root/.npm /app/node_modules && \
    npm cache clean --force && \
    npm install --omit=dev --legacy-peer-deps

# Now copy rest of the app
COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
