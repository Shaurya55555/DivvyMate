# Use Node.js base image
FROM node:14

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "src/app.js"]
