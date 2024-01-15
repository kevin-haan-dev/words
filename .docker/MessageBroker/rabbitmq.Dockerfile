FROM rabbitmq:3-management

ENV RABBITMQ_DEFAULT_USER=default_user
ENV RABBITMQ_DEFAULT_PASS=default_pw

ARG PORT=3000
ENV PORT $PORT
ARG MANAGEMENT_PORT=3000
ENV MANAGEMENT_PORT $MANAGEMENT_PORT

EXPOSE $PORT $MANAGEMENT_PORT


