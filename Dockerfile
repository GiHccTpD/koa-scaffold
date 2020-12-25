FROM node:12-alpine as builder

# ENV NODE_ENV production

LABEL maintainer="xxx@xxx.com"

# 创建工作目录
RUN rm -rf /app
RUN mkdir /app

ADD package.json package-lock.json ./

RUN npm ci

FROM node:12-alpine

WORKDIR /app

ENV NODE_ENV production

ADD . .
COPY --from=builder node_modules node_modules

EXPOSE 3000

CMD npm start
