FROM node

WORKDIR /app

COPY package*.json /app

RUN npm i

RUN npm install -g @angular/cli@latest

COPY . /app 

EXPOSE 4200

CMD [ "npm", "run", "local" ]