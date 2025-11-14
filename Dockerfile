# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app

# 환경 변수 (빌드용)
ENV NEXT_PUBLIC_BASE_URL=https://promocean.co.kr

# 의존성 설치 (devDependencies 포함)
COPY package*.json ./
RUN npm ci && \
    npm cache clean --force

# 전체 프로젝트 복사 후 빌드
COPY . .
RUN npm run build

# ================================
# Run Stage
FROM node:22-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_BASE_URL=https://promocean.co.kr

# standalone 빌드 결과물만 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

EXPOSE 3000

# Standalone 모드 실행
CMD ["node", "server.js"]