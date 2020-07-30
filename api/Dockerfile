FROM mhart/alpine-node:14 as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM mhart/alpine-node:slim-14
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist .
EXPOSE 4000
CMD ["node", "index.js"]
