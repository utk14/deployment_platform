FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY ./ ./

EXPOSE 5000
RUN apt-get update && apt install -y expect 
CMD ["npm" , "run" , "server"]
