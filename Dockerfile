FROM node:12 AS builder

# Install necessary tools for bcrypt to run in docker before npm install
RUN apt-get update \
    && apt-get install -y build-essential python

# Create app directory
WORKDIR /app

# Commenting these out because we're going with a local instance of sqlLite
# ARG POSTGRESQL_URL
# ENV POSTGRESQL_URL "$POSTGRESQL_URL"

RUN npm install -g prisma2 --unsafe-perm

COPY ./prisma/schema.prisma ./

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install
RUN npm audit fix

COPY tsconfig*.json ./
COPY src ./src

RUN npm run migrate:save
RUN npm run migrate:up
RUN npm run prisma:generate
RUN npm run build

# TODO use node-alpine when supported by prisma2 https://github.com/prisma/prisma2/issues/702
FROM node:12
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["npm", "run", "start:prod" ]
# CMD ["npx", "prisma2", "migrate", "save", "--experimental;"]
# CMD ["npx", "prisma2", "migrate", "up", "--experimental"]