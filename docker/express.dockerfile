FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/Nadgob228/College-Telegram-App.git .
RUN rm -rf frontend
RUN rm -rf docker

WORKDIR /app/backend
RUN npm install

RUN echo "DB_USER=${DB_USER}" > .env && \
    echo "DB_PASSWORD=${DB_PASSWORD}" >> .env && \
    echo "DB_NAME=${DB_NAME}" >> .env && \
    echo "DB_IP=l${DB_IP}" >> .env


EXPOSE 3000

CMD ["npm", "run", "start"]
