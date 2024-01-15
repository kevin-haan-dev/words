# STAGE: build
FROM node:21.5.0 as build
WORKDIR /app
COPY Backend/ProcessorService/package*.json ./
RUN npm install
COPY Backend/ProcessorService/ ./
COPY Backend/shared ./src/shared
RUN npm test

# STAGE: prod
FROM node:21.5.0-alpine
WORKDIR /app
COPY --from=build /app /app
EXPOSE $PORT
CMD ["node", "ProcessorService.js"]
