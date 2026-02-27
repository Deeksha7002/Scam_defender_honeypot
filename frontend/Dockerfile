# Stage 1: Build the Vite App
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the production bundle
RUN npm run build

# Stage 2: Serve the App using Nginx
FROM nginx:alpine

# Copy the built output from Vite (usually /dist) to Nginx's html service directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx proxy
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
