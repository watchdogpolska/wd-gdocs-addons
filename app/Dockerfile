FROM node:12-alpine

WORKDIR /src
COPY package* ./
ENV NODE_ENV=production
RUN npm ci
ENV PORT 8080
COPY . .
COPY config.docker.js config.js
CMD ["node","index.js"]
