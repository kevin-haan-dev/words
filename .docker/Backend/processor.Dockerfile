FROM node:21.5.0

WORKDIR /usr/src/app

COPY Backend/ProcessorService/package*.json ./
COPY Backend/ProcessorService/init-processor.sh ./

COPY Backend/shared ./src/shared

RUN npm install

COPY Backend/ProcessorService/ ./

RUN chmod +x ./init-processor.sh

ARG PORT=5002
ENV PORT $PORT
EXPOSE $PORT

CMD ["./init-processor.sh"]