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

ARG VITE_GEOGRAPHY_LIVE_API=${VITE_GEOGRAPHY_LIVE_API}
ARG VITE_GEOGRAPHY_DEV_API=${VITE_GEOGRAPHY_DEV_API}
ARG VITE_LINKEDIN_PROFILE=${VITE_LINKEDIN_PROFILE}
ARG VITE_MAIL_URL=${VITE_MAIL_URL}
ARG VITE_WEBSITE_URL=${VITE_WEBSITE_URL}

ENV VITE_GEOGRAPHY_DEV_API=${VITE_GEOGRAPHY_DEV_API}
ENV VITE_GEOGRAPHY_LIVE_API=${VITE_GEOGRAPHY_LIVE_API}
ENV VITE_LINKEDIN_PROFILE=${VITE_LINKEDIN_PROFILE}
ENV VITE_MAIL_URL=${VITE_MAIL_URL}
ENV VITE_WEBSITE_URL=${VITE_WEBSITE_URL}

# Build the static files
RUN npm run build

# Use NGINX to serve the static files
FROM nginx:alpine

# Copy the built files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
