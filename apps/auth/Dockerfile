#Dev phase
From node:24-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#Prod phase: 

From node:24-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --prod

COPY  --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]