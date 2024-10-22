# nginx.Dockerfile

# Use the official Nginx image from Docker Hub
FROM nginx:latest

# Copy custom Nginx configuration into the container
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy static assets (optional, if any) into the container
# Example: COPY ./static /usr/share/nginx/html/static

# Expose port 80 for HTTP traffic
EXPOSE 80
