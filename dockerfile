#parent image
FROM node:18-alpine

#creating an app directory inside the container
WORKDIR /app

#copy package.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of the application code
COPY . .

# Set environment variable PORT
ENV PORT=4561


#port
EXPOSE 4561

# command to start the application
CMD ["node","index.js"]
