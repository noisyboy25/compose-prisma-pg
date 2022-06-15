FROM node:alpine

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn

COPY . .

EXPOSE 8080:5000
CMD ["yarn", "start"]