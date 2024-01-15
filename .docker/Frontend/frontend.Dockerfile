# STAGE: build
FROM node:21.5.0 as build-stage
WORKDIR /usr/src/app
COPY Frontend/package*.json ./
RUN npm install
COPY Frontend/ .
RUN npm run build

# STAGE: prod
FROM nginx:latest
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE $PORT
CMD ["nginx", "-g", "daemon off;"]
