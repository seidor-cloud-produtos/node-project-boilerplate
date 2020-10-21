# BUILDER STAGE
FROM node:lts-alpine as builder

WORKDIR /usr/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# RUNTIME STAGE
FROM node:lts-alpine as runtime

WORKDIR /usr/app

ENV NODE_ENV=production

COPY --from=builder "/usr/app/dist/" "/usr/app/dist/"
COPY --from=builder "/usr/app/node_modules/" "/usr/app/node_modules/"
COPY --from=builder "/usr/app/package.json" "/usr/app/package.json"

RUN npm prune --production

CMD ["npm", "start"]
