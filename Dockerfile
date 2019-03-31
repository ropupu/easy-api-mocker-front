FROM node:10-slim

RUN npm install -g @vue/cli

WORKDIR /app

COPY ./app /app

ENV NODE_PATH "/usr/local/lib/node_modules"

EXPOSE 9000

CMD ["npm", "run", "serve"]