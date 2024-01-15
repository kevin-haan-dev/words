FROM nginx:latest

COPY Nginx/nginx.conf.template /etc/nginx/nginx.conf.template
COPY Nginx/init-nginx.sh ./

RUN chmod +x ./init-nginx.sh

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

CMD ["./init-nginx.sh"]