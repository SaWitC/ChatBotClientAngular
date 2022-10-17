FROM node:16.14.2-alpine AS build

WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm config set fetch-retry-mintimeout 40000
RUN npm install
COPY . .
#RUN npm run build
#EXPOSE 4200
CMD ng serve --host 0.0.0.0
#CMD src/app/node_modules/.bin/ng serve --host 0.0.0.0 --disabledHostCheck


