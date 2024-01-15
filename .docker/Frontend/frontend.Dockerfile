FROM node:21.5.0

WORKDIR /usr/src/app

COPY Frontend/package*.json ./
COPY Frontend/init-frontend.sh ./

RUN npm install

COPY . .

RUN chmod +x ./init-frontend.sh


ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

CMD ["sh", "./init-frontend.sh"]
