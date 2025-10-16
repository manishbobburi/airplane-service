FROM node

WORKDIR /developer/nodejs/airplane-service

COPY . .

RUN npm ci

CMD ["npm", "run", "dev"]