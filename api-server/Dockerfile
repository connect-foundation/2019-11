FROM node:alpine
WORKDIR /app

RUN npm install -g pm2
RUN npm install -g typescript
RUN npm install -g cross-env

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ]