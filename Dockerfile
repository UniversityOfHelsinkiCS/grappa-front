FROM node:8.0.0

# Setup
RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

# We have package called dotenv for building. Runtime envs are in docker-compose.
RUN echo "NODE_ENV=production" >> .env
RUN echo "API_URL=/v1/backend" >> .env
RUN echo "WEBSOCKET_URL=/" >> .env

# Using PM2 to keep the service up.
RUN npm install pm2 -g

RUN npm i

# Somehow npm i didn't build
RUN npm run build:prod

EXPOSE 8080

CMD ["pm2-docker", "app.js"]