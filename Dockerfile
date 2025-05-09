# --- Install dependencies ---
  FROM node:20-alpine AS deps

  WORKDIR /app
  
  # Install system dependencies
  RUN apk add --no-cache libc6-compat
  
  # Install npm dependencies using package-lock.json
  COPY package.json package-lock.json ./
  RUN npm ci
  
  # --- Build app ---
  FROM node:20-alpine AS builder
  
  WORKDIR /app
  
  RUN apk add --no-cache libc6-compat
  
  COPY . .
  
  # Copy installed modules
  COPY --from=deps /app/node_modules ./node_modules
  
  ENV NODE_ENV=production
  
  # Build the Next.js app
  RUN npm run build
  
  # --- Final runtime image ---
  FROM node:20-alpine AS runner
  
  WORKDIR /app
  
  RUN apk add --no-cache libc6-compat
  
  ENV NODE_ENV=production
  ENV PORT=4900
  
  # Only copy necessary output files
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package.json ./package.json
  COPY --from=builder /app/next.config.js ./next.config.js
  
  EXPOSE 4900
  
  CMD ["npx", "next", "start"]
  