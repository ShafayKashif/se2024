FROM node:20-slim

WORKDIR /server

COPY package.json package-lock.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "start"]