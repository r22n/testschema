FROM node:16
WORKDIR /usr/src/app
COPY dist .
EXPOSE 8888
CMD [ "npx", "serve", "-p", "8888" ]