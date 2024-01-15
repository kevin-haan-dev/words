FROM nginx:latest

COPY Nginx/nginx.conf /etc/nginx/nginx.conf

ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

CMD ["nginx", "-g", "daemon off;"]
