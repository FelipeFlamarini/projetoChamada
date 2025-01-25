FROM node:20.18.0 AS base

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27.3-alpine3.20-perl AS runner

COPY --from=base /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]