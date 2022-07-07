# pull the official base image
FROM node: alpine
# set working direction
WORKDIR /app

# install application dependencies
COPY package.json ./
RUN npm i
# add app
COPY . ./
# start app
CMD ["npm", "start"]