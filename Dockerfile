# Use the official Node.js 16 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files
COPY package*.json ./


# Copy Prisma schema first
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy remaining files
COPY . .

# Expose the port your Nest.js application is listening on
EXPOSE 8081

# Command to start your Nest.js application
CMD [ "npm", "run", "start:dev" ]