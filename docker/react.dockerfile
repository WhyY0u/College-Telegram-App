FROM node:22 AS build

WORKDIR /app

RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/WhyY0u/College-Telegram-App.git .

RUN rm -rf backend docker

WORKDIR /app/frontend

COPY front/.env .env

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 27017

CMD ["nginx", "-g", "daemon off;"]
