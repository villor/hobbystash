FROM node:14-alpine
WORKDIR /usr/src/hobbystash
COPY build/ .
RUN yarn install --production --frozen-lockfile
EXPOSE 4000
ENV NODE_ENV=production
CMD ["node", "server/build/index.js"]
