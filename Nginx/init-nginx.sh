envsubst '$WEBSOCKET_PORT,$FRONTEND_PORT,$HTTP_PORT' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx -g 'daemon off;'
