FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild the bcrypt module
RUN npm rebuild bcrypt --build-from-source

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]