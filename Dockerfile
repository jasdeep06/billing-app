# Container build for this ObjectStack app.
#
#   docker build -t my-app .
#   docker run -p 8080:8080 \
#     -e OS_DATABASE_URL="postgres://user:pass@db-host:5432/myapp" \
#     -e OS_AUTH_SECRET -e OS_SECRET_KEY \
#     my-app
#
# Or run the full app + Postgres stack: see docker-compose.yml.
# Docs: https://objectstack.ai/docs/deployment/self-hosting

# ── Build stage: compile TypeScript metadata to the artifact ─────────
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx os build              # → dist/objectstack.json

# ── Runtime: the official ObjectStack runtime image ──────────────────
# Ships Node + @objectstack/cli with `os start`, a non-root user, the
# /api/v1/health HEALTHCHECK, and OS_ARTIFACT_PATH/OS_PORT preset (port 8080)
# — see the self-hosting guide linked above.
#
# Pinned at scaffold time to the @objectstack/cli version this project
# resolved, so the runtime runs the same CLI that built your artifact.
# Move both together when you upgrade — see docker/README.md tag table.
FROM ghcr.io/objectstack-ai/objectstack:17.4.0
COPY --from=build --chown=node:node /app/dist/objectstack.json /srv/app/objectstack.json

# OS_DATABASE_URL, OS_AUTH_SECRET, and OS_SECRET_KEY are injected at runtime —
# never bake them into the image.
