### ────────────────────────────────
### Stage 1 — Build Astro site
### ────────────────────────────────
FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build && ls -R dist   # <- forces output + prints fail clearly


### ────────────────────────────────
### Stage 2 — Serve with NGINX
### ────────────────────────────────
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# copy built static site
COPY --from=build /app/dist .

# replace default nginx route handling
RUN rm /etc/nginx/conf.d/default.conf

COPY <<EOF /etc/nginx/conf.d/site.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;

    # This ensures real subpages load correctly
    try_files \$uri \$uri/ /index.html;
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
