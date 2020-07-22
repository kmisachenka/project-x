FROM mhart/alpine-node:14 as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM mhart/alpine-node:slim-14
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist .
EXPOSE 4000
CMD ["node", "index.js"]
