FROM node:22

WORKDIR /app

RUN apt-get update && apt-get install -y git
RUN git clone https://github.com/Nadgob228/College-Telegram-App.git .
RUN rm -rf backend
RUN rm -rf docker

WORKDIR /app/frontend

COPY server.cert server.cert
COPY server.key server.key

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev"]
