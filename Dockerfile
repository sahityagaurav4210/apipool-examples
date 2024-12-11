FROM node:20 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Install dependencies
RUN npm install

# Copy all files for building
COPY . .

# Build the static files
RUN npm run build

# Use NGINX to serve the static files
FROM nginx:alpine

# Copy the built files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
