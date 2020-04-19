FROM node:10
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm start
EXPOSE 3000