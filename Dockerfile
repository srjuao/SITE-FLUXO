# Build Stage
FROM node:23-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets
COPY --from=build /app/dist /app/dist

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
