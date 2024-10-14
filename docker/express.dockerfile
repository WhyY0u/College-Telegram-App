FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/WhyY0u/College-Telegram-App.git .
RUN rm -rf frontend
RUN rm -rf docker

WORKDIR /app/backend
RUN npm install

COPY back/.env .env

EXPOSE 3000

CMD ["npm", "run", "start"]
