# Base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy bot files
COPY . .

# Expose port (if needed)
EXPOSE 3000

# Start the bot
CMD ["yarn", "start"]
