# syntax=docker/dockerfile:1

# FROM node:22-slim
# FROM node:20.11-slim
# FROM alpine:3.18
FROM node:20-alpine

ENV NODE_VERSION 20.12.2

RUN npm cache clean --force

WORKDIR /

#/usr/src/app

# chown -R change the owner of app folder to app
# the node_modules will be owned by app too

# When using COPY with more than one source file, the destination must be a directory and end with a /

COPY packeage*.json ./

# Install Python, necessary for node-gyp --- nuevo 7/6/2024
#RUN apk add --no-cache python3 make g++ 

# When using COPY with more than one source file, the destination must be a directory and end with a /

RUN npm cache clean --force

# Nuevo eliminar modulos de nodejs --- nuevo 7/6/2024
RUN rm /node_modules

RUN npm install

ENV NODE_ENV production

COPY . ./

# USER app
USER node

EXPOSE 4000

# CMD [ "npm", "start" ]
CMD [ "node", "app.js" ]