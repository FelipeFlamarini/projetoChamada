FROM node:20.18.0 AS base

WORKDIR /app

ARG VITE_FASTAPI_APP_URL
ARG VITE_FASTAPI_APP_URL_WS

ENV VITE_FASTAPI_APP_URL=${VITE_FASTAPI_APP_URL}
ENV VITE_FASTAPI_APP_URL_WS=${VITE_FASTAPI_APP_URL_WS}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged:1.27.3-alpine3.20-perl AS runner

COPY --from=base /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]