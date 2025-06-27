FROM node:18-alpine

WORKDIR /

# Go up one directory to get package.json from root
COPY ../package*.json ./

RUN npm install

COPY ../ ./

EXPOSE 5000

CMD ["node", "index.js"]
