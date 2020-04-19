FROM node:10
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm start
EXPOSE 3000