FROM node:15.7.0-alpine3.12 AS debug
RUN apk add python3 g++ make 
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g nodemon
COPY . .

CMD ["nodemon", "--inspect=0.0.0.0", "index.js"]
# ENTRYPOINT ["tail", "-f", "/dev/null"]