FROM node:current-alpine3.22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

#  Run
FROM node:current-alpine3.22

WORKDIR /app

COPY --from=builder /app ./
RUN npm install --only=production

CMD ["npm", "run", "start:prod"]

