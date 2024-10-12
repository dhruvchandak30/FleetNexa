# Dockerfile for Booking Service

# Step 1: Specify the base image
FROM node:14

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the source code
COPY . .

# Step 5: Build TypeScript files
RUN npm run build

# Step 6: Expose the port the app runs on
EXPOSE 3001

# Step 7: Define the command to run the app
CMD ["node", "dist/index.js"]
