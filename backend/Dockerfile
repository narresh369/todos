FROM node:18-alpine

WORKDIR /app

# Go up one directory to get package.json from root
COPY ../package*.json ./app

RUN npm install

COPY ../ ./app

EXPOSE 5000

CMD ["node", "index.js"]
