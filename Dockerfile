# STAGE 1
FROM node:16.15.0 as builder
WORKDIR /backend-app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-container

# STAGE 2
FROM node:16.15.0
WORKDIR /backend-app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /backend-app/dist ./dist
COPY . .

EXPOSE 3000
CMD [ "node", "dist/server.js" ]