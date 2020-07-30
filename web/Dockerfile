FROM mhart/alpine-node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM mhart/alpine-node:slim-14
WORKDIR /app
COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["node", "build/server"]
