# Multi-stage build for Next.js

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Increase Node memory limit for build
ENV NODE_OPTIONS=--max-old-space-size=4096

# Configure npm for better network resilience
RUN npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm config set fetch-timeout 300000 && \
    npm config set fetch-retries 5

# Install dependencies with retry logic
COPY package.json package-lock.json ./
RUN npm ci || npm ci || npm ci

# Build the application
COPY . .
RUN npm run build

# Verify build output exists
RUN ls -la /app/out || echo "Build output missing!"

# Production stage
FROM nginx:alpine

# Copy Next.js static export
COPY --from=builder /app/out /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
