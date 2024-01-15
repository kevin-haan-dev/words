FROM node:21.5.0

WORKDIR /usr/src/app

COPY Backend/WebSocketService/package*.json ./
COPY Backend/WebSocketService/init-websocket.sh ./

COPY Backend/shared ./src/shared

RUN npm install

COPY Backend/WebSocketService/ ./

RUN chmod +x ./init-websocket.sh

ARG PORT=5003
ENV PORT $PORT
EXPOSE $PORT

CMD ["./init-websocket.sh"]