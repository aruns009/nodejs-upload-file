# Use offical node image
FROM node:alpine AS develop

# Work in /usr/app/ directory
WORKDIR /usr/app/

# Copy source files
COPY ./ ./

# Expose node port
EXPOSE ${PORT}

# Install dependencies
RUN npm install

#run application
CMD ["npm", "start"]


# This is for the unit test
FROM develop AS test

# Expose node port
EXPOSE ${PORT}

#run unit test
RUN npm test 