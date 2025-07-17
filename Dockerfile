# ---- Base ----
# Use a specific Node.js version. Choose one compatible with your project.
FROM node:20-alpine AS base
# No need for corepack enable if using npm

# ---- Dependencies ----
# Install dependencies required for building and running
FROM base AS deps
WORKDIR /app

# Copy package manager files for npm
# Use wildcard * for package-lock.json just in case
COPY package.json package-lock.json* ./

# Install dependencies based on the lock file using npm ci
RUN npm install --legacy-peer-deps

# ---- Builder ----
# Build the Next.js application
FROM base AS builder
WORKDIR /app
# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application code
COPY . .

# Set build-time environment variables if needed (e.g., NEXT_PUBLIC_API_URL)
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the Next.js application using npm
RUN npm run build

# ---- Runner ----
# Prepare the final image for running the application
FROM base AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
# Optionally uncomment the next line to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user and group for security
RUN addgroup --system --gid 1001 nextjs
RUN adduser --system --uid 1001 nextjs

# Create .next directory and set permissions
RUN mkdir -p /app/.next/cache && \
    chown -R nextjs:nextjs /app/.next

# Copy the standalone Next.js output files
COPY --from=builder /app/.next/standalone ./
# Copy the static assets required by the standalone server
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static
# Copy public assets
COPY --from=builder /app/public ./public

# Set the user to the non-root user
USER nextjs

# Expose the port the app runs on (default 3000)
EXPOSE 3002

# Set the default port environment variable
ENV PORT=3002
# Set the default hostname environment variable (listen on all interfaces)
ENV HOSTNAME=0.0.0.0

# Command to run the optimized server.js produced by 'output: standalone'
# This command uses the environment variables PORT and HOSTNAME
CMD ["node", "server.js"]