FROM node:lts-alpine AS build_image

WORKDIR /app/
COPY **/package.json **/package-lock.json ./

RUN npm install
COPY . /app/

RUN ls .

RUN npm run build

# Production stage
FROM node:lts-alpine AS prod_image
WORKDIR /app

COPY --from=build_image /app/dist/ /app/dist/

RUN npm install serve -g

COPY **/package.json **/package-lock.json ./

EXPOSE 3000

CMD ["serve", "-s", "dist"]