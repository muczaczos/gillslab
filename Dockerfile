# Etap 1: Build aplikacji
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Przekazanie zmiennych środowiskowych do builda
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_BUILD=true

RUN npm run build:payload && \
    npm run build:server && \
    npm run copyfiles

# Etap 2: Obraz produkcyjny
FROM node:18-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app /app

# Skrypt wejściowy do czekania na Mongo + budowania Next.js
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 3000

CMD ["sh", "./entrypoint.sh"]
