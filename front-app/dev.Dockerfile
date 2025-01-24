FROM node:20.18.0

WORKDIR /app

COPY package*.json ./

RUN ["npm", "i"]

CMD ["npm", "run", "dev"]