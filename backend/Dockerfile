FROM node:18.16.0-alpine3.17
RUN apk --no-cache add git
RUN git config --global user.email "alon@test.com"
RUN git config --global user.name "My Name"

RUN mkdir -p /opt/app

WORKDIR /opt/app

COPY package.json package-lock.json .

RUN npm install

COPY tsconfig.json ./

COPY src/ .

EXPOSE 3000

CMD [ "npm", "start"]